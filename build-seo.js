const fs = require('node:fs');
const path = require('node:path');
const { renderSharedLayout, renderProductCards } = require('./components.js');

const origin = 'https://albassamwatertanks.ae/';
const company = 'AL Bassmar Water Tanks';
const logo = 'Al Bassmar Water Tanks Logo.png';
const pages = {
  'index.html': ['Home', 'hero.png'],
  'products.html': ['Products', 'products-hero.png'],
  'fiberglass-water-tanks.html': ['Fiberglass Water Tanks', 'fibreglass.png', 'products.html'],
  'plastic-water-tanks.html': ['Plastic Water Tanks', 'hdpe.png', 'products.html'],
  'septic-tanks.html': ['Septic Tanks', 'septic.png', 'products.html'],
  'grp-panel-tanks.html': ['GRP Panel Tanks', 'grp.png', 'products.html'],
  'who-we-supply.html': ['Who We Supply', 'who-we-supply-hero.png'],
  'about.html': ['About Us', 'about-hero.png'],
  'contact.html': ['Contact', 'contact-hero.png'],
  'terms-and-conditions.html': ['Terms & Conditions', logo],
};

const pageUrl = (file) => file === 'index.html' ? origin : new URL(file, origin).href;
const assetUrl = (file) => new URL('assets/' + encodeURIComponent(file), origin).href;

function structuredData(file) {
  if (file === 'index.html') {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': origin + '#organization',
          name: company,
          url: origin,
          logo: assetUrl(logo),
          telephone: '+971509109633',
          email: 'info@albassamwatertanks.ae',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Dubai',
            addressRegion: 'Dubai',
            addressCountry: 'AE',
          },
        },
        {
          '@type': 'WebSite',
          '@id': origin + '#website',
          name: company,
          url: origin,
          inLanguage: 'en-AE',
          publisher: { '@id': origin + '#organization' },
        },
      ],
    };
  }

  const parent = pages[file][2];
  const trail = ['index.html', ...(parent ? [parent] : []), file];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: pages[item][0],
      item: pageUrl(item),
    })),
  };
}

function metadata(file, html) {
  const title = html.match(/<title>([^<]+)<\/title>/)[1].replaceAll('"', '&quot;');
  const description = html.match(/<meta name="description" content="([^"]+)">/)[1];
  const canonical = pageUrl(file);
  const image = assetUrl(pages[file][1]);
  const properties = {
    'og:type': 'website',
    'og:site_name': company,
    'og:locale': 'en_AE',
    'og:title': title,
    'og:description': description,
    'og:url': canonical,
    'og:image': image,
  };
  const cards = {
    'twitter:card': file === 'terms-and-conditions.html' ? 'summary' : 'summary_large_image',
    'twitter:title': title,
    'twitter:description': description,
    'twitter:image': image,
  };
  return [
    '<link rel="canonical" href="' + canonical + '">',
    ...Object.entries(properties).map(([key, value]) => '<meta property="' + key + '" content="' + value + '">'),
    ...Object.entries(cards).map(([key, value]) => '<meta name="' + key + '" content="' + value + '">'),
    '<script type="application/ld+json">\n' + JSON.stringify(structuredData(file), null, 2).replaceAll('<', '\\u003c') + '\n</script>',
  ].join('\n');
}

function generatedBlock(name, content) {
  return '<!-- Generated ' + name + ' -->\n' + content + '\n<!-- End generated ' + name + ' -->';
}

function renderPage(file) {
  const filename = path.join(__dirname, file);
  const source = fs.readFileSync(filename, 'utf8');
  const html = source
    .replace(/<!-- Generated (seo|header|footer) -->[\s\S]*?<!-- End generated \1 -->\r?\n/g, '')
    .replace(/<script src="components\.js" defer><\/script>\r?\n/, '')
    .replace('<link rel="icon" type="image/svg+xml" href="assets/al-bassmar-favicon-rounded.svg">',
      '<link rel="icon" type="image/png" sizes="96x96" href="assets/al-bassmar-favicon-rounded.png">');
  const { header, footer } = renderSharedLayout(file);
  const output = html
    .replace('</head>', () => generatedBlock('seo', metadata(file, html)) + '\n</head>')
    .replace('<main id="main">', () => generatedBlock('header', header.trim()) + '\n<main id="main">')
    .replace('</main>', () => '</main>\n' + generatedBlock('footer', footer.trim()))
    .replace(/(<div class="cards" data-product-cards="(h[23])"( data-related-products)?>)[\s\S]*?(?=<\/div>\s*<\/section>)/g,
      (_, start, heading, related) => start + '\n' + renderProductCards(file, heading, Boolean(related)) + '\n    ');
  return output;
}

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...Object.keys(pages).map((file) => '  <url><loc>' + pageUrl(file) + '</loc></url>'),
  '</urlset>',
  '',
].join('\n');

const publicFiles = new Map(Object.keys(pages).map((file) => [file, renderPage(file)]));
for (const file of ['styles.css', 'site.js', 'robots.txt']) {
  publicFiles.set(file, fs.readFileSync(path.join(__dirname, file), 'utf8'));
}
publicFiles.set('sitemap.xml', sitemap);

// Collect public assets from the emitted markup (including social images and
// the Organization logo) and from CSS. Copy only those assets.
const assetPaths = new Set();
const assetReferences = /(?:https:\/\/albassamwatertanks\.ae\/)?\bassets\/[a-zA-Z0-9%._/-]+/g;
for (const file of [...Object.keys(pages), 'styles.css']) {
  for (const [reference] of publicFiles.get(file).matchAll(assetReferences)) {
    const name = decodeURIComponent(new URL(reference, origin).pathname.slice(1));
    if (!name.startsWith('assets/') || path.posix.normalize(name) !== name || name.includes('\\')) {
      throw new Error('Invalid asset reference in ' + file + ': ' + reference);
    }
    assetPaths.add(name);
  }
}
for (const file of [...assetPaths].sort()) {
  publicFiles.set(file, fs.readFileSync(path.join(__dirname, file)));
}

function publishDist() {
  const root = fs.realpathSync(__dirname);
  const dist = path.join(root, 'dist');
  const existing = fs.lstatSync(dist, { throwIfNoEntry: false });
  if (existing && (!existing.isDirectory() || existing.isSymbolicLink() || fs.realpathSync(dist) !== dist)) {
    throw new Error('Refusing to replace a redirected or non-directory dist path.');
  }

  const staging = fs.mkdtempSync(path.join(root, '.dist-build-'));
  if (path.dirname(fs.realpathSync(staging)) !== root) {
    throw new Error('Build staging directory is outside the project.');
  }
  const pending = path.join(staging, 'public');
  const previous = path.join(staging, 'previous');
  let keepStaging = false;
  try {
    for (const [name, contents] of publicFiles) {
      const destination = path.join(pending, name);
      fs.mkdirSync(path.dirname(destination), { recursive: true });
      fs.writeFileSync(destination, contents);
    }
    if (existing) fs.renameSync(dist, previous);
    try {
      fs.renameSync(pending, dist);
    } catch (error) {
      if (existing) {
        try {
          fs.renameSync(previous, dist);
        } catch {
          keepStaging = true;
          throw new Error('Could not restore the previous build. It is saved at ' + previous, { cause: error });
        }
      }
      throw error;
    }
  } finally {
    if (!keepStaging) fs.rmSync(staging, { recursive: true, force: true });
  }
}

publishDist();

// Keep the root HTML and sitemap usable for the existing local preview.
for (const file of [...Object.keys(pages), 'sitemap.xml']) {
  const filename = path.join(__dirname, file);
  const contents = publicFiles.get(file);
  if (!fs.existsSync(filename) || fs.readFileSync(filename, 'utf8') !== contents) {
    fs.writeFileSync(filename, contents);
  }
}
console.log('Built dist/ with ' + Object.keys(pages).length + ' pages and ' + assetPaths.size + ' referenced assets.');
