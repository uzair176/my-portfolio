# Portfolio maintenance guide

The site intentionally has no build step. Most future updates happen in `index.html`, and the responsive grid adapts automatically.

## Add a project

1. In `index.html`, find `<div class="project-grid">`.
2. Duplicate one complete `<article class="project-card reveal">...</article>` block.
3. Update the project number, tools, exact title, description, and visual labels.
4. Use a verified full URL for the project action. Keep `target="_blank" rel="noopener noreferrer"` on external links.
5. If the project has no public URL, remove the link and use a plain `<span class="project-note">...</span>` instead. Never publish `href="#"`.

The project grid automatically supports additional cards at mobile, tablet, and desktop widths.

## Add a certification

1. Find `<div class="certificate-list">` in `index.html`.
2. Duplicate a linked `<a class="certificate reveal">` item when a verified credential URL exists.
3. Duplicate the unlinked `<div class="certificate reveal">` item when no public credential URL exists.
4. Update the index, certification name, provider, and date.

## Update skills or experience

- Skills live inside `<div class="skill-groups">` and can be added as new `<li>` items.
- Experience entries live inside `<div class="timeline">`. Duplicate a complete `timeline-item` article for a new role.
- Keep job titles, employer names, dates, and measured outcomes exact.

## Replace the resume

Replace `assets/resume.pdf` with the new PDF while keeping the filename unchanged. The header download button will continue to work automatically.

## Before publishing

- Search for `href="#"`, `lorem`, `coming soon`, and outdated contact details.
- Open every external project and credential URL.
- Check the site at 375px, 768px, and 1440px.
- Check both themes and the mobile menu.
- Confirm `/assets/resume.pdf`, `/robots.txt`, and `/sitemap.xml` load successfully.
