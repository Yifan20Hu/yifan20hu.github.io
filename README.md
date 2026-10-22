# Yifan Hu · Homepage

This repository contains a static academic website in [`docs/`](docs/). It uses plain HTML, CSS, and a small navigation script, so GitHub Pages can publish it without a build step.

## Preview locally

Run `node preview.js` and open http://127.0.0.1:4173.

## Publish with GitHub Pages

In the repository **Settings → Pages**, choose **Deploy from a branch**, select **master**, and choose **/docs** as the folder. The resulting user site address is https://yifan20hu.github.io/. If Pages is already using `/ (root)`, switch it to `/docs` after reviewing this redesign.

`yifanhu.github.io` is tied to the GitHub username `yifanhu`. A repository named `yifanhu.github.io` under the `Yifan20Hu` account would be a project site at `yifan20hu.github.io/yifanhu.github.io/`, not the shorter user site. The `yifanhu` username is currently registered by a separate GitHub account. If you control that account, publish from its own `yifanhu.github.io` repository; otherwise keep `yifan20hu.github.io` or use a domain you own.

## Updating content

- Homepage, research, news, and recruiting: `docs/index.html`
- Teaching and courses: `docs/teaching.html`
- Full publication list: `docs/publications.html`
- People: `docs/people.html`
- Slides: `docs/talks.html`
- Awards and service: `docs/service.html`
- Shared styles and mobile menu: `docs/styles.css`, `docs/script.js`

The older Academic Pages starter files remain in the repository for now; the `/docs` publishing source keeps them separate from the new site.
