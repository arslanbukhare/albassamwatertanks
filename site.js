const productMenu = document.querySelector('.products-menu');
const homeProductsNav = document.querySelector('.home-page .products-nav');
const mobileHeader = window.matchMedia('(max-width: 950px)');
const navToggle = document.querySelector('.nav-toggle');
const navigation = document.querySelector('#main-navigation');
const header = navToggle.closest('.header');

function setNavigationOpen(open) {
  header.classList.toggle('nav-open', open);
  navToggle.setAttribute('aria-expanded', String(open));
  navigation.inert = mobileHeader.matches && !open;
  if (!open) productMenu.open = false;
}

setNavigationOpen(false);
header.classList.add('nav-ready');
mobileHeader.addEventListener('change', () => setNavigationOpen(false));

navToggle.addEventListener('click', (event) => {
  const open = navToggle.getAttribute('aria-expanded') === 'false';
  setNavigationOpen(open);
  if (open && event.detail === 0) navigation.querySelector('a').focus();
});

header.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !event.defaultPrevented && header.classList.contains('nav-open')) {
    navToggle.focus();
    setNavigationOpen(false);
  }
});

if (homeProductsNav) {
  homeProductsNav.addEventListener('pointerenter', (event) => {
    if (!mobileHeader.matches && event.pointerType === 'mouse') {
      productMenu.open = true;
    }
  });

  homeProductsNav.addEventListener('pointerleave', (event) => {
    if (!mobileHeader.matches && event.pointerType === 'mouse' && !productMenu.querySelector('.dropdown').contains(document.activeElement)) {
      productMenu.open = false;
    }
  });
}

productMenu.closest('.products-nav').addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && productMenu.open) {
    event.preventDefault();
    productMenu.open = false;
    productMenu.querySelector('summary').focus();
  }
});

document.addEventListener('click', (event) => {
  if (!header.contains(event.target) && header.classList.contains('nav-open')) {
    if (navigation.contains(document.activeElement)) navToggle.focus();
    setNavigationOpen(false);
  }
  if (!productMenu.contains(event.target)) {
    productMenu.open = false;
  }
});

const quotationLink = document.querySelector('#quotation-link');
const selectedTank = new URLSearchParams(window.location.search).get('tank');

if (quotationLink && selectedTank) {
  const subject = encodeURIComponent('Quotation request: ' + selectedTank);
  quotationLink.href = 'mailto:sales@albassam.ae?subject=' + subject;
}

for (const orderForm of document.querySelectorAll('[data-whatsapp-order]')) {
  orderForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const selections = new FormData(orderForm);
    const message = [
      orderForm.dataset.orderIntro || 'Hello AL Bassmar, I would like to place an order.',
      'Product: ' + orderForm.dataset.productName,
      'Size: ' + selections.get('size'),
      'Condition: ' + selections.get('condition'),
    ].join('\n');
    const whatsapp = new URL(orderForm.action);
    whatsapp.searchParams.set('text', message);
    window.location.assign(whatsapp.href);
  });

  orderForm.querySelector('button[type="submit"]').disabled = false;
}
