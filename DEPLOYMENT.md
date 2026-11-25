# Deployment and basic SEO

The canonical origin is `https://albassmarwatertanks.ae/`. Serve the homepage at `/` using the existing `index.html` file. Keep the other public `.html` paths.

## Prepare the release

- Run `node build-seo.js` locally, then commit the source changes and generated `dist/` together. The build uses Node.js built-ins only.
- Set the public document root to `dist/` or publish only its contents. The host needs only static file serving. Keep repository metadata, development scripts, templates, and documentation outside the public document root.
- Apply the redirects at the host, proxy, or CDN. Serve valid TLS certificates for both hostnames if the `www` redirect is handled over HTTPS.

## Redirect rules

Use server-side permanent redirects (HTTP 301 or 308). Preserve paths and query strings, and combine rules into one hop where possible.

| Request | Expected result |
| --- | --- |
| `http://albassmarwatertanks.ae/products.html` | Redirect to `https://albassmarwatertanks.ae/products.html` |
| `https://www.albassmarwatertanks.ae/contact.html?tank=Septic%20Tanks` | Redirect to `https://albassmarwatertanks.ae/contact.html?tank=Septic%20Tanks` |
| `http://www.albassmarwatertanks.ae/index.html` or `https://albassmarwatertanks.ae/index.html` | Redirect to `https://albassmarwatertanks.ae/` |
| `https://albassmarwatertanks.ae/` | HTTP 200, serving the homepage directly |
| Unknown path on the preferred origin | HTTP 404 |

Apply the `/index.html` redirect to external requests only. The host can still resolve `/` internally to `index.html`. This avoids redirect loops.

## Verify after publishing

1. Check the redirects, ten sitemap URLs, `robots.txt`, CSS, JS, logo, and favicon over HTTPS. Confirm valid content types and that public pages do not return an `X-Robots-Tag: noindex` header or require authentication. Serve the favicon as `image/png`.
2. In [Google Search Console](https://search.google.com/search-console), verify the `albassmarwatertanks.ae` Domain property via DNS, or use an existing verified property. Submit `https://albassmarwatertanks.ae/sitemap.xml`.
3. Use URL Inspection to test the homepage, Products page, and a product detail page. Validate the homepage Organization and WebSite data and the nested product breadcrumbs. Check that the favicon and sharing images are crawler-accessible. Google determines when these changes appear in search.
4. Check mobile navigation and the WhatsApp and quotation links on the deployed site, including a product-specific quotation URL.
