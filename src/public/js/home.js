// ==================== DATA ====================
const PRODUCT_IMGS = [
  'https://asset.msi.com/resize/image/global/product/product_1671517780ac43b7c99ba51ea79703f8c15c29e1da.png62405b38c58fe0f07fcef2367d8a9ba1/600.png',
  'https://asset.msi.com/resize/image/global/product/product_16801065174831e51dff4ac3f8697c4a0f42bb3ee6.png62405b38c58fe0f07fcef2367d8a9ba1/600.png',
  'https://asset.msi.com/resize/image/global/product/product_1671517780ac43b7c99ba51ea79703f8c15c29e1da.png62405b38c58fe0f07fcef2367d8a9ba1/600.png',
];

const LAPTOP_IMGS = [
  'https://asset.msi.com/resize/image/global/product/product_1649925359de04d9d8a1c3f7b6b45f0f7eeef2b2e7.png62405b38c58fe0f07fcef2367d8a9ba1/600.png',
];

const MONITOR_IMGS = [
  'https://asset.msi.com/resize/image/global/product/product_16728063434a6a7e6498e7a3f1e8afed04b5f3bee0.png62405b38c58fe0f07fcef2367d8a9ba1/600.png',
];

function genProduct(i, isLaptop = false, isMonitor = false) {
  const stocks = ['in-stock', 'low-stock', 'out-stock'];
  const stockLabels = ['In Stock', 'Low Stock', 'Out of Stock'];
  const si = Math.floor(Math.random() * 3);
  const img = isMonitor
    ? `https://via.placeholder.com/160x120/1a1a1a/e00000?text=Monitor+${i + 1}`
    : isLaptop
      ? `https://via.placeholder.com/160x130/1a1a1a/e00000?text=Laptop+${i + 1}`
      : `https://via.placeholder.com/160x130/1a1a1a/e00000?text=PC+${i + 1}`;

  return {
    img,
    si,
    name: 'EX DISPLAY : MSI Pro 16 Flex-135AU 15.6 MULTITOUCH All-In-On...',
    old: '$499.00',
    price: '$499.00',
    stars: Math.floor(Math.random() * 2) + 4,
    reviews: Math.floor(Math.random() * 20) + 1,
  };
}

function starHtml(n) {
  let s = '';
  for (let i = 0; i < 5; i++) s += `<i class="fa${i < n ? 's' : 'r'} fa-star"></i>`;
  return s;
}

function renderProductGrid(id, count = 6, isLaptop = false, isMonitor = false) {
  const grid = document.getElementById(id);
  let html = '';

  for (let i = 0; i < count; i++) {
    const p = genProduct(i, isLaptop, isMonitor);
    const stocks = ['in-stock', 'low-stock', 'out-stock'];
    const stockLabels = ['In Stock', 'Low Stock', 'Out of Stock'];

    html += `
      <div class="product-card">
        <span class="stock-badge ${stocks[p.si]}">${stockLabels[p.si]}</span>
        <img src="${p.img}" alt="Product" data-fallback-src="https://via.placeholder.com/160x130/f5f5f5/cccccc?text=PC">
        <div class="stars">${starHtml(p.stars)} <span>(${p.reviews})</span></div>
        <div class="product-name">${p.name}</div>
        <div class="product-old">${p.old}</div>
        <div class="product-price">${p.price}</div>
        <button class="add-cart">Add to Cart</button>
      </div>`;
  }

  grid.innerHTML = html;
}

const buildNames = ['CHARLIE V6', 'BRAVO V6', 'ALPHA V6', 'MII V6', 'DELTA V6'];
const buildClasses = ['charlie', 'bravo', 'alpha', 'mii', 'delta'];

function renderBuildsGrid() {
  const grid = document.getElementById('builds-grid');
  let html = '';

  buildNames.forEach((name, i) => {
    html += `
      <div class="build-card">
        <span class="build-label ${buildClasses[i]}">${name}</span>
        <img src="https://via.placeholder.com/140x110/111111/e00000?text=${encodeURIComponent(name)}" alt="${name}" data-hide-on-error="true">
        <div class="stars">${starHtml(4)} <span>(${i + 2})</span></div>
        <div class="product-name" style="color:#bbb;">EX DISPLAY : MSI Pro 16 Flex-135AU 15.6 MULTITOUCH All-In-On...</div>
        <div class="product-old" style="color:#555;">$499.00</div>
        <div class="product-price">$499.00</div>
      </div>`;
  });

  grid.innerHTML = html;
}

// Instagram placeholder tiles
function renderInsta() {
  const captions = [
    "If you've recently made a desktop PC or laptop purchase, you might want to consider adding peripherals...",
    'As a gamer, superior sound counts for a lot. You need to hear enemies tiptoeing up behind you for a sneak attack...',
    "If you've recently made a desktop PC or laptop purchase, you might want to consider adding peripherals...",
    "If you've recently made a desktop PC or laptop purchase, you might want to consider adding peripherals...",
    "If you've recently made a desktop PC or laptop purchase, you might want to consider adding peripherals...",
  ];
  const colors = ['2c3e50', '8e44ad', '27ae60', 'e67e22', '2980b9'];
  let html1 = '', html2 = '';

  for (let i = 0; i < 5; i++) {
    html1 += `
      <div class="insta-card-wrap">
        <div class="insta-card">
          <img class="insta-img" src="https://via.placeholder.com/200x200/${colors[i]}/ffffff?text=📸" data-fallback-src="https://via.placeholder.com/200x200/222/fff?text=📸">
          <div class="insta-overlay"><i class="fab fa-instagram"></i></div>
        </div>
        <div class="insta-caption">${captions[i]}</div>
      </div>`;
  }

  document.getElementById('insta-grid1').innerHTML = html1;

  const colors2 = ['c0392b', '16a085', 'd35400'];
  for (let i = 0; i < 3; i++) {
    html2 += `
      <div class="insta-card-wrap">
        <div class="insta-card">
          <img class="insta-img" src="https://via.placeholder.com/200x200/${colors2[i]}/ffffff?text=📸" data-fallback-src="https://via.placeholder.com/200x200/222/fff?text=📸">
          <div class="insta-overlay"><i class="fab fa-instagram"></i></div>
        </div>
        <div class="insta-caption">${captions[i]}</div>
      </div>`;
  }

  document.getElementById('insta-grid2').innerHTML = html2;
}

// ==================== HAMBURGER MENU ====================
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');
const mobileNavClose = document.getElementById('mobile-nav-close');

if (hamburger && mobileNav && mobileNavClose) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });

  mobileNavClose.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  });

  mobileNav.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ==================== SLIDER ====================
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.slider-nav .dot');

function goSlide(n) {
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

function changeSlide(dir) {
  goSlide(currentSlide + dir);
}

setInterval(() => changeSlide(1), 5000);

// Slider controls (CSP-safe: no inline onclick)
document.querySelectorAll('[data-slide-dir]').forEach((btn) => {
  btn.addEventListener('click', () => changeSlide(Number(btn.dataset.slideDir)));
});

document.querySelectorAll('.slider-nav .dot[data-slide-index]').forEach((dot) => {
  dot.addEventListener('click', () => goSlide(Number(dot.dataset.slideIndex)));
});

// Tab buttons
document.querySelectorAll('.tab-btn').forEach((btn) => {
  btn.addEventListener('click', function () {
    this.closest('.tab-bar').querySelectorAll('.tab-btn').forEach((b) => b.classList.remove('active'));
    this.classList.add('active');
  });
});

// Add to cart
let cartCount = 0;

function addToCart(btn) {
  cartCount++;
  const badge = document.querySelector('.badge');
  if (badge) badge.textContent = cartCount;
  btn.textContent = '✓ Added!';
  btn.style.background = '#27ae60';

  setTimeout(() => {
    btn.textContent = 'Add to Cart';
    btn.style.background = '';
  }, 1500);
}

// Newsletter submit (CSP-safe: no inline onsubmit)
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
  });
}

// Product grid button click delegation
document.addEventListener('click', (e) => {
  const addBtn = e.target.closest('.add-cart');
  if (addBtn) {
    addToCart(addBtn);
  }
});

// Image fallback handling (replaces inline onerror)
function bindImageFallbacks(root = document) {
  root.querySelectorAll('img[data-fallback-src]').forEach((img) => {
    img.addEventListener(
      'error',
      () => {
        const fallback = img.dataset.fallbackSrc;
        if (fallback && img.src !== fallback) {
          img.src = fallback;
        }
      },
      { once: true }
    );
  });

  root.querySelectorAll('img[data-hide-on-error="true"]').forEach((img) => {
    img.addEventListener(
      'error',
      () => {
        img.style.display = 'none';
      },
      { once: true }
    );
  });
}

// ==================== INIT ====================
renderProductGrid('new-products-grid', 6);
renderBuildsGrid();
renderProductGrid('laptops-grid', 5, true);
renderProductGrid('desktops-grid', 5);
renderProductGrid('monitors-grid', 5, false, true);
renderInsta();
bindImageFallbacks();

