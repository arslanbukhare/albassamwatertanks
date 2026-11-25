const products = [
  {
    slug: 'fiberglass-water-tanks',
    name: 'Fiberglass Water Tanks',
    price: '1,700',
    sizes: 17,
    image: 'fibreglass',
    imageLabel: 'Horizontal fiberglass tank',
  },
  {
    slug: 'plastic-water-tanks',
    name: 'Plastic Water Tanks',
    price: '1,500',
    sizes: 11,
    image: 'hdpe',
    imageLabel: 'Vertical plastic water tank',
  },
  {
    slug: 'septic-tanks',
    name: 'Septic Tanks',
    price: '1,700',
    sizes: 17,
    image: 'septic',
    imageLabel: 'Septic tank',
  },
  {
    slug: 'grp-panel-tanks',
    name: 'GRP Panel Tanks',
    price: '1,400',
    image: 'grp',
    imageLabel: 'Sectional GRP tank with access ladder',
    custom: true,
  },
];

function productCard(product, heading) {
  const { slug, name, image, imageLabel, price, sizes, custom } = product;
  const orderMessage = encodeURIComponent('Hello AL Bassmar, I would like to order ' + name + '.');
  return `<article class="card">
      <div class="tank-image ${image}" role="img" aria-label="${imageLabel}"></div>
      <div class="card-body">
        <${heading} id="${slug}-title">${name}</${heading}>
        <p><strong>Starting from AED ${price}</strong><br>${custom ? 'Custom-built to size' : sizes + ' sizes available'}</p>
        <p class="card-exchange">
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 8h15m-4-4 4 4-4 4M20 16H5m4-4-4 4 4 4"/></svg>
          Exchange available for used or old tanks
        </p>
        <div class="card-actions">
          <a class="button primary card-sizes" href="${slug}.html" aria-labelledby="${slug}-action ${slug}-title" id="${slug}-action">View Sizes</a>
          <a class="button card-whatsapp" href="https://wa.me/971509109633?text=${orderMessage}" aria-label="Order ${name} on WhatsApp">Order on WhatsApp</a>
        </div>
      </div>
  </article>`;
}

const productLinks = products.map(({ slug, name }) => `<a href="${slug}.html">${name}</a>`).join('\n            ');
const footerProductLinks = products.map(({ slug, name }) => `<li><a href="${slug}.html">${name}</a></li>`).join('');
const header = `
<div class="utility"><div class="wrap"><span>A water tank supplier for projects across the UAE</span><a href="tel:+971509109633"><svg class="utility-phone-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-5-2-2 2a13 13 0 0 1-7-7l2-2-2-5Z"/></svg> +971 50 910 9633</a></div></div>
<header class="header"><div class="wrap header-row">
  <a class="brand" href="./"><img src="assets/Al%20Bassmar%20Water%20Tanks%20Logo.png" alt="AL Bassmar Water Tanks"></a>
  <nav id="main-navigation" aria-label="Main navigation">
      <a href="./">Home</a>
      <div class="products-nav">
        <a href="products.html">Products</a>
        <details class="products-menu">
          <summary aria-label="Show product pages"></summary>
          <div class="dropdown">
            ${productLinks}
          </div>
        </details>
      </div>
      <a href="who-we-supply.html">Who We Supply</a>
      <a href="about.html">About</a>
      <a href="contact.html">Contact</a>
  </nav>
  <a class="button primary" href="contact.html#quote">Get a Quote</a>
  <button class="nav-toggle" type="button" aria-label="Toggle navigation" aria-expanded="false" aria-controls="main-navigation"><span aria-hidden="true"></span></button>
</div></header>
`;
const footer = `
<footer class="site-footer" id="contact">
  <div class="wrap footer-content">
    <div class="footer-columns">
      <div class="footer-intro">
        <a class="brand footer-brand" href="./"><img src="assets/AL%20BASSMAR%20Water%20Tank%20Logo-White.png" alt="AL Bassmar Water Tanks"></a>
        <p>AL Bassmar supplies water and septic tanks for homes, businesses, and project sites across the UAE.</p>
        <div class="footer-social">
          <a href="https://www.facebook.com/search/pages/?q=AL%20Bassmar%20Water%20Tanks"><svg class="footer-social-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M14 22v-9h3l.5-3H14V8c0-.9.3-1.5 1.6-1.5H18V3.8a21 21 0 0 0-2.4-.2C12.9 3.6 11 5.2 11 8v2H8v3h3v9Z"/></svg> Facebook</a>
          <a href="https://www.instagram.com/explore/search/keyword/?q=AL%20Bassmar%20Water%20Tanks"><svg class="footer-social-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.5" cy="6.5" r="1.15" fill="currentColor"/></svg> Instagram</a>
        </div>
      </div>
      <section>
        <h2>Products</h2>
        <ul>${footerProductLinks}</ul>
      </section>
      <section>
        <h2>Who We Supply</h2>
        <ul><li>Factories &amp; Industrial</li><li>Labour Accommodation</li><li>Contractors</li><li>Building Owners</li><li>Hotels &amp; Hospitality</li><li>Farms &amp; Agriculture</li></ul>
      </section>
      <section>
        <h2>Company</h2>
        <ul><li><a href="about.html">About</a></li><li><a href="contact.html">Contact</a></li></ul>
      </section>
      <section>
        <h2>Get in Touch</h2>
        <ul class="footer-contact">
          <li><svg class="footer-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-5-2-2 2a13 13 0 0 1-7-7l2-2-2-5Z"/></svg><div><a href="tel:+971509109633">+971 50 910 9633</a><small>CEO's Contact Number</small></div></li>
          <li><svg class="footer-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg><a href="mailto:info@albassamwatertanks.ae">info@albassamwatertanks.ae</a></li>
          <li><svg class="footer-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M19 10c0 5-7 10-7 10S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2"/></svg><span>Al Quoz, Dubai, UAE</span></li>
          <li><svg class="footer-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg><span>Monday to Saturday</span></li>
        </ul>
        <a class="button footer-whatsapp" href="https://wa.me/971509109633">Chat on WhatsApp</a>
      </section>
    </div>
  </div>
  <div class="footer-bottom"><div class="wrap footer-bar">
    <span>&copy; AL Bassmar Water Tanks</span>
    <a href="terms-and-conditions.html">Terms &amp; Conditions</a>
  </div></div>
</footer>
`;

function renderSharedLayout(page) {
  const currentHref = page === 'index.html' ? './' : page;
  const isProduct = products.some(({ slug }) => page === slug + '.html');
  const markCurrent = (markup) => markup.replace(
    /<a\b[^>]*>/g,
    (link) => link.includes('href="' + currentHref + '"') && !link.includes('class="brand')
      ? link.replace(/>$/, ' aria-current="page">')
      : link,
  );
  return {
    header: markCurrent(isProduct ? header.replace('class="products-nav"', 'class="products-nav is-active"') : header),
    footer: markCurrent(footer),
  };
}

function renderProductCards(page, heading, related) {
  const items = related ? products.filter(({ slug }) => page !== slug + '.html') : products;
  return items.map((product) => productCard(product, heading === 'h2' ? 'h2' : 'h3')).join('\n');
}

module.exports = { renderSharedLayout, renderProductCards };
