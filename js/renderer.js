/* renderer.js — Markdown article renderer
   Reads ?src=section/file.md from the URL, fetches the file,
   parses optional YAML front matter, renders Markdown via marked.js,
   applies KaTeX math and highlight.js code highlighting,
   then builds a scrollspy table of contents.

   Dependencies (loaded via CDN in article.html):
     - marked.js
     - highlight.js
     - KaTeX + auto-render extension
*/

/* ── Front-matter parser ───────────────────────────────────── */
function parseFrontMatter(raw) {
  if (!raw.trimStart().startsWith('---')) return { meta: {}, body: raw };
  const start = raw.indexOf('---') + 3;
  const end   = raw.indexOf('\n---', start);
  if (end === -1) return { meta: {}, body: raw };

  const block = raw.slice(start, end).trim();
  const body  = raw.slice(end + 4).trimStart();
  const meta  = {};

  block.split('\n').forEach(line => {
    const colon = line.indexOf(':');
    if (colon === -1) return;
    const key = line.slice(0, colon).trim();
    let   val = line.slice(colon + 1).trim();

    // Detect array syntax: [a, b, c]
    if (val.startsWith('[') && val.endsWith(']')) {
      meta[key] = val.slice(1, -1).split(',').map(s => s.trim()).filter(Boolean);
    } else {
      // Strip surrounding quotes
      meta[key] = val.replace(/^['"]|['"]$/g, '');
    }
  });

  return { meta, body };
}

/* ── Helpers ───────────────────────────────────────────────── */
function formatDate(iso) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  } catch (_) { return iso; }
}

function slugify(text) {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

/* ── TOC builder + scroll spy ──────────────────────────────── */
function buildTOC(contentEl, tocListEl) {
  if (!tocListEl) return;
  const headings = Array.from(contentEl.querySelectorAll('h2, h3, h4'));
  if (headings.length === 0) {
    const aside = document.getElementById('toc-aside');
    if (aside) aside.style.display = 'none';
    return;
  }

  headings.forEach((h, i) => {
    const id = `h${i}-${slugify(h.textContent)}`;
    h.id = id;

    const li = document.createElement('li');
    li.className = `toc-${h.tagName.toLowerCase()}`;
    const a = document.createElement('a');
    a.href = `#${id}`;
    a.textContent = h.textContent;
    li.appendChild(a);
    tocListEl.appendChild(li);
  });

  // Scroll spy via IntersectionObserver
  const links = tocListEl.querySelectorAll('a');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const active = tocListEl.querySelector(`a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-10% 0px -80% 0px' });

  headings.forEach(h => observer.observe(h));
}

/* ── Main loader ───────────────────────────────────────────── */
async function loadArticle() {
  const params  = new URLSearchParams(window.location.search);
  const src     = params.get('src');
  const bodyEl  = document.getElementById('article-content');
  const titleEl = document.getElementById('article-title');
  const metaEl  = document.getElementById('article-meta-row');
  const tagsEl  = document.getElementById('article-tags');
  const tocEl   = document.getElementById('toc-list');

  if (!src || !bodyEl) return;

  // Infer section for breadcrumb
  const section = src.split('/')[0];
  const sectionLabels = {
    projects: 'Projects',
    analysis: 'Circuit Analysis',
    blog: 'Blog'
  };
  const bcSection = document.getElementById('bc-section');
  const bcLink    = document.getElementById('bc-link');
  if (bcSection) bcSection.textContent = sectionLabels[section] || section;
  if (bcLink)    bcLink.href = `/${section}/`;

  try {
    const res = await fetch(`/${src}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const raw = await res.text();

    const { meta, body } = parseFrontMatter(raw);

    // Page title
    const title = meta.title || src.split('/').pop().replace(/\.md$/, '');
    document.title = `${title} — Nikhil Muralidharan`;
    if (titleEl) titleEl.textContent = title;

    // Meta row: date + reading time estimate
    if (metaEl) {
      const parts = [];
      if (meta.date) parts.push(formatDate(meta.date));
      const words = body.split(/\s+/).length;
      parts.push(`${Math.max(1, Math.ceil(words / 200))} min read`);
      metaEl.textContent = parts.join(' · ');
    }

    // Tags
    if (tagsEl && meta.tags && meta.tags.length) {
      meta.tags.forEach(tag => {
        const span = document.createElement('span');
        span.className = 'article-tag';
        span.textContent = tag;
        tagsEl.appendChild(span);
      });
    }

    // Configure marked
    marked.use({
      gfm: true,
      breaks: false,
      // Renderer override: add language class for hljs
      renderer: (() => {
        const r = new marked.Renderer();
        r.code = (code, lang) => {
          const language = lang && hljs.getLanguage(lang) ? lang : 'plaintext';
          const highlighted = hljs.highlight(
            typeof code === 'object' ? code.text : code,
            { language }
          ).value;
          return `<pre><code class="hljs language-${language}">${highlighted}</code></pre>`;
        };
        return r;
      })()
    });

    bodyEl.innerHTML = marked.parse(body);

    // KaTeX math rendering
    if (window.renderMathInElement) {
      renderMathInElement(bodyEl, {
        delimiters: [
          { left: '$$',  right: '$$',  display: true  },
          { left: '$',   right: '$',   display: false },
          { left: '\\[', right: '\\]', display: true  },
          { left: '\\(', right: '\\)', display: false }
        ],
        throwOnError: false
      });
    }

    // Build TOC
    buildTOC(bodyEl, tocEl);

  } catch (err) {
    bodyEl.innerHTML = `
      <div class="empty-state">
        <strong>Could not load article</strong>
        <p>Make sure <code>${src}</code> exists and the site is served over HTTP (not opened as a local file).</p>
      </div>`;
  }
}

document.addEventListener('DOMContentLoaded', loadArticle);
