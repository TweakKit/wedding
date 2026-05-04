# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static pre-wedding website for Duc Tai & Pham Nhi (wedding date: 24.05.2026). No build system, no package manager, no framework — pure HTML/CSS/JS.

## Development

Open `index.html` directly in a browser, or serve with any static file server:

```bash
python -m http.server 8000
# or
npx serve .
```

There are no tests, no linting tools, and no build steps.

## Architecture

Single-page site (`index.html`) with all sections inline: hero → nav-links → featured → gallery → videos → our-story → contact → footer. A lightbox overlay is appended at the bottom of the body.

**`css/style.css`** — all styles in one file, organized by section with comment headers. Design tokens (colors, fonts, transitions) are defined as CSS custom properties in `:root`. Two typefaces: `Cormorant Garamond` (serif headings, large text) and `Montserrat` (sans-serif UI text), loaded from Google Fonts. Responsive breakpoints at 1024px, 768px, and 480px.

**`js/main.js`** — all behavior in one file. Organized as plain objects (`menu`, `header`, `lightbox`, `scrollAnimations`, `toTop`), each with an `init()` method called on `DOMContentLoaded`. No dependencies.

**`images/`** — all static assets. Gallery images are named `gallery-1.jpg` through `gallery-40.jpg` with a gap at `gallery-4.jpg` (removed). Hero uses `hero-1.jpg` as a single static background. Video is `video-thumb-1.mp4`.

## Gallery layout

The gallery grid (`css/style.css`) uses modifier classes on `.gallery-item`:
- `.gallery-item--tall` — spans 2 grid rows (portrait orientation)
- `.gallery-item--wide` — spans 2 grid columns (landscape orientation)

When adding or reordering gallery items in `index.html`, match these modifiers to the aspect ratio of the image.
