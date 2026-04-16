/* theme.js — Dark/light mode toggle
   The inline <script> in <head> applies the saved theme immediately
   to prevent a flash of the wrong theme on load.
   This file wires up the toggle button after DOMContentLoaded.        */

function nmMoonSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 16 16">
    <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278z"/>
  </svg>`;
}

function nmSunSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707z"/>
  </svg>`;
}

function nmSetTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  try { localStorage.setItem('nm-theme', theme); } catch (_) {}

  // Update toggle icon
  const btn = document.getElementById('theme-toggle');
  if (btn) btn.innerHTML = theme === 'dark' ? nmSunSVG() : nmMoonSVG();

  // Swap highlight.js stylesheet if present
  const hljsLight = document.getElementById('hljs-light');
  const hljsDark  = document.getElementById('hljs-dark');
  if (hljsLight) hljsLight.disabled = (theme === 'dark');
  if (hljsDark)  hljsDark.disabled  = (theme !== 'dark');
}

function nmToggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  nmSetTheme(current === 'dark' ? 'light' : 'dark');
}

document.addEventListener('DOMContentLoaded', function () {
  const btn = document.getElementById('theme-toggle');
  if (btn) {
    const theme = document.documentElement.getAttribute('data-theme') || 'light';
    btn.innerHTML = theme === 'dark' ? nmSunSVG() : nmMoonSVG();
    btn.addEventListener('click', nmToggleTheme);
  }

  // Mark active nav link
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href && href !== '/' && href !== '/index.html' && path.startsWith(href.replace(/\/$/, ''))) {
      a.classList.add('active');
    }
  });
});
