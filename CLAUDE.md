# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static website for **Otesha**, a Waldorf-inspired kindergarten in Yadavagiri, Mysuru. Single-page site with no build tools, frameworks, or package manager — just HTML, CSS, and vanilla JavaScript.

## Development

Open `index.html` directly in a browser. No build step, no server required. For live reload during development, use any static server (e.g., `npx serve` or VS Code Live Server).

## File Structure

- `index.html` — Single page with all sections (nav, hero, about, people, learning, areas, rhythm, practical, admissions, further reading, footer)
- `css/style.css` — All styles; CSS custom properties defined in `:root`
- `js/main.js` — Nav scroll effect, hero slideshow, scroll animations, accordion toggles
- `images/1-5.jpg` — Site photographs
- `Otesha_website_content.docx` — Canonical content source (all website text originates from this document)
- `otesha-classical-garden_3.html`, `otesha_refined_editorial_1.html` — Original design reference templates (not served to users)

## Architecture

### Design System

**Color palette** (CSS variables in `:root`):
- `--forest` (#2c4a2e) — primary dark green for headings, nav, footer, buttons
- `--sage` (#618555) — accent green for labels, links
- `--terracotta` (#8b4a2e) — warm accent for section labels
- `--cream`/`--paper` — background alternation between sections
- `--warm-border` — subtle green-tinted border used throughout

**Typography**:
- Headings: Cormorant Garamond (serif, weight 300-500)
- Body: Jost (sans-serif, weight 300)
- Both loaded from Google Fonts

**Section pattern**: Sections alternate between `--paper` and `--cream` backgrounds using the `.section-alt` class. Each section uses `.inner` (max-width: 1160px) for content containment.

### Key Interactive Components

1. **Hero Slideshow** (`js/main.js` IIFE): 5-image carousel with Ken Burns zoom effect, text rotation with slide animation, dot/arrow navigation, touch swipe support, 6-second auto-advance
2. **Nav**: Fixed position, transparent over hero, becomes opaque with backdrop blur on scroll (toggled via `.scrolled` class at 80px scroll)
3. **Scroll Animations**: IntersectionObserver adds `.visible` to `.fade-up` elements at 7% threshold
4. **Further Reading Accordions**: `toggleFR()` function toggles `.open` class on `.fr-body` and `.fr-toggle` elements; only one open at a time

### Content Sections (in page order)

Hero → Tagline Bar → Our Story (about) → The People → Our Learning Journey → Areas of Learning (6-item grid) → Daily Rhythm → Practical Matters (with timing table) → Admissions → Further Reading (6 expandable articles) → Footer

## Styling Conventions

- Section labels use `.section-label` (uppercase, terracotta, small)
- H2 headings use `<em>` for italic emphasis portions
- Grids collapse responsively at 900px and 600px breakpoints
- Nav links hide on mobile (no hamburger menu currently)
