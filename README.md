# Sagar Ghimire — portfolio

A static, multi-page portfolio for GitHub Pages. No build step or npm dependencies.

## Preview

Run `python3 -m http.server 8000` in this directory, then open http://localhost:8000.

## Structure

- `index.html`: introduction, selected work, services, and contact invitation
- `projects.html`: project archive
- `project-janasagar.html`, `project-mcommunity.html`: detailed project stories
- `skills.html`: skills grouped by practical use
- `about.html`: background and working process
- `contact.html`: email, clipboard button, and social links
- `assets/css/style.css`, `assets/js/main.js`: shared styles and interactions

Project interface illustrations on the home page are labeled concepts, not product screenshots. Email is handled by the visitor's mail app; there is no submission backend. Clipboard failures display a manual-copy instruction.

The original CNAME, verification file, robots.txt, sitemap, images, and Git history are preserved. No changes have been committed, pushed, or deployed.

## Apply this working copy to the Desktop checkout

The editing session could read but not write to the Desktop. Review the working copy first, then run:

```sh
rsync -av --exclude='.git' /home/e404x/Documents/Codex/2026-11-10/new-chat/portfolio/ /home/e404x/Desktop/portfolio/profile/
```

## Identity and enquiries

The SG logo is in `assets/brand/sagar-ghimire-logo.png`, shared by the navigation, footer, and favicon. Every page has a native expandable contact panel with direct email, copy email, and LinkedIn. The contact form prepares a local email draft and provides a copyable fallback; it does not send or store a submission.
