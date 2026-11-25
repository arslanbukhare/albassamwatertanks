# AL Bassmar Water Tanks website

This is a static website for [AL Bassmar Water Tanks](https://albassamwatertanks.ae/). The project requires Node.js locally to build the release. The production server only serves static files and does not need Node.js.

## Local development

1. Edit the root HTML files for page content, `components.js` for shared navigation, footer and product cards, `styles.css` for styling, or `site.js` for browser behavior. Edit the public page list and sharing images in `build-seo.js` when adding or removing a page.
2. Run `node build-seo.js` from the project root. No package installation is needed. The build refreshes the root HTML for the existing local preview, regenerates the sitemap, and replaces `dist/` with the current release.
3. Preview over HTTP. Use a local web server such as XAMPP and open the project’s `dist/` directory through that server. If PHP is available, another option is `php -S 127.0.0.1:8080 -t dist`, then open `http://127.0.0.1:8080/`.

## Private GitHub repository

When you are ready to connect the project, initialize a local Git repository if needed, create a **private** repository on GitHub, and add it as the remote. Commit both the source files and the generated `dist/` directory. After each change, rebuild, review the source and `dist/` diffs together, and commit them before pushing. Keep hosting credentials outside the repository.

## Deploy to production

Point the production document root at the checked-out `dist/` directory, or publish only the contents of `dist/` to the host’s public document root. Serve `dist/index.html` at `/` and keep the existing `.html` URLs. When copying releases, ensure files removed from `dist/` are also removed from the host’s public copy.

See [DEPLOYMENT.md](DEPLOYMENT.md) for the host-independent redirect requirements and post-deployment checks.
