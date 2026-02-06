# CLAUDE.md

## Project Overview

This is a **GitHub Pages personal website** and **GitHub profile repository** (`nikhilmuralidharan/nikhilmuralidharan`). It serves dual purposes:

1. The `README.md` is displayed on the GitHub profile page
2. The `index.html` + `style.css` power a personal website hosted via GitHub Pages

## Repository Structure

- `index.html` — Main website page (professional bio, experience, education, interests, contact)
- `style.css` — Stylesheet for the website
- `README.md` — GitHub profile README (displayed on the GitHub profile page)
- `CLAUDE.md` — This file; guidance for AI-assisted development

## GitHub Pages

- The site is served from the root of the repository
- No build step required — plain HTML/CSS, no bundler or static site generator
- To enable: Repository Settings > Pages > Source: Deploy from branch (`main`, root `/`)

## Conventions

- Keep the tone professional but approachable
- The website and README should stay in sync for content (experience, education, contact info)
- HTML uses semantic elements (`<header>`, `<main>`, `<section>`, `<footer>`)
- CSS uses custom properties (CSS variables) defined in `:root` for theming
- The site is responsive — test changes at both desktop and mobile widths

## Editing Guidelines

- Preserve the existing section order unless explicitly asked to change it
- Do not remove contact information or professional details without being asked
- When adding new sections, follow the existing pattern: `<section id="...">` with an `<h2>` heading
- Keep `README.md` and `index.html` content consistent when updating professional details
- No build steps, tests, or CI — this is a static site
