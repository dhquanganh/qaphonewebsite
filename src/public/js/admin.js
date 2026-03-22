
// ═══════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', async () => {
  const [allUsers] = await Promise.all([
    fetch('/admin/api/get-all-users').then(r => r.json())
  ]);

  const PRODUCTS = [
    { id: 'SP001', name: 'iPhone 15 Pro Max 256GB', brand: 'Apple', cat: 'iPhone', price: 34990000, sale: 32990000, stock: 45, rating: 4.9, status: 'active', emoji: '📱' },
    { id: 'SP002', name: 'Samsung Galaxy S24 Ultra', brand: 'Samsung', cat: 'Samsung', price: 29990000, sale: 27500000, stock: 32, rating: 4.8, status: 'active', emoji: '📱' },
    { id: 'SP003', name: 'Xiaomi 14 Pro 512GB', brand: 'Xiaomi', cat: 'Xiaomi', price: 18990000, sale: 17490000, stock: 0, rating: 4.7, status: 'out', emoji: '📱' },
    { id: 'SP004', name: 'Oppo Find X7 Ultra', brand: 'Oppo', cat: 'Oppo', price: 22990000, sale: 21490000, stock: 18, rating: 4.6, status: 'active', emoji: '📱' },
    { id: 'SP005', name: 'iPhone 14 128GB', brand: 'Apple', cat: 'iPhone', price: 19990000, sale: 17990000, stock: 60, rating: 4.7, status: 'active', emoji: '📱' },
    { id: 'SP006', name: 'Samsung A55 5G 256GB', brand: 'Samsung', cat: 'Samsung', price: 9990000, sale: 8990000, stock: 5, rating: 4.5, status: 'active', emoji: '📱' },
    { id: 'SP007', name: 'Xiaomi Redmi Note 13 Pro', brand: 'Xiaomi', cat: 'Xiaomi', price: 7490000, sale: 6990000, stock: 80, rating: 4.4, status: 'active', emoji: '📱' },
    { id: 'SP008', name: 'Oppo Reno 11 5G', brand: 'Oppo', cat: 'Oppo', price: 8990000, sale: 7990000, stock: 0, rating: 4.3, status: 'hidden', emoji: '📱' },
  ];

  const ORDERS = [
    { code: 'ORD-2401', customer: 'Nguyễn Văn A', product: 'iPhone 15 Pro Max', total: 32990000, pay: 'COD', status: 'pending', date: '20/01/2025' },
    { code: 'ORD-2402', customer: 'Trần Thị B', product: 'Samsung S24 Ultra', total: 27500000, pay: 'VNPAY', status: 'shipping', date: '19/01/2025' },
    { code: 'ORD-2403', customer: 'Lê Văn C', product: 'Xiaomi 14 Pro', total: 17490000, pay: 'MOMO', status: 'done', date: '18/01/2025' },
    { code: 'ORD-2404', customer: 'Phạm Thị D', product: 'Oppo Find X7', total: 21490000, pay: 'COD', status: 'cancelled', date: '17/01/2025' },
    { code: 'ORD-2405', customer: 'Hoàng Văn E', product: 'iPhone 14', total: 17990000, pay: 'VNPAY', status: 'done', date: '16/01/2025' },
    { code: 'ORD-2406', customer: 'Đặng Thị F', product: 'Samsung A55', total: 8990000, pay: 'COD', status: 'pending', date: '15/01/2025' },
    { code: 'ORD-2407', customer: 'Vũ Văn G', product: 'Redmi Note 13 Pro', total: 6990000, pay: 'MOMO', status: 'shipping', date: '14/01/2025' },
  ];
  const COUPONS = [
    { code: 'SALE50', type: 'percent', val: 50, min: 5000000, uses: 23, max: 100, expiry: '31/03/2025', active: true },
    { code: 'GIAMGIA200K', type: 'fixed', val: 200000, min: 3000000, uses: 45, max: 200, expiry: '28/02/2025', active: true },
    { code: 'NEWUSER', type: 'percent', val: 15, min: 0, uses: 112, max: 500, expiry: '31/12/2025', active: true },
    { code: 'FLASH30', type: 'percent', val: 30, min: 10000000, uses: 8, max: 50, expiry: '20/01/2025', active: false },
    { code: 'TETHOLIDAY', type: 'fixed', val: 500000, min: 15000000, uses: 5, max: 30, expiry: '10/02/2025', active: true },
    { code: 'VIP10', type: 'percent', val: 10, min: 0, uses: 200, max: 1000, expiry: '31/12/2025', active: true },
  ];

  const CATEGORIES = [
    { name: 'iPhone', slug: 'iphone', parent: '—', count: 48, active: true },
    { name: 'Samsung', slug: 'samsung', parent: '—', count: 35, active: true },
    { name: 'Xiaomi', slug: 'xiaomi', parent: '—', count: 28, active: true },
    { name: 'Oppo', slug: 'oppo', parent: '—', count: 22, active: true },
    { name: 'Phụ Kiện', slug: 'phu-kien', parent: '—', count: 15, active: false },
  ];

  const MONTHS = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'];
  const REV_DATA = [320, 415, 280, 520, 610, 480, 590, 720, 540, 680, 750, 820];

  // ═══════════════════════════════════════════════
  // HELPERS
  // ═══════════════════════════════════════════════
  function fmtPrice(n) { return new Intl.NumberFormat('vi-VN').format(n) + '₫'; }

  function statusChip(s) {
    const map = {
      active: ['green', 'Đang bán'], out: ['red', 'Hết hàng'], hidden: ['muted', 'Đã ẩn'],
      pending: ['yellow', 'Chờ xử lý'], shipping: ['blue', 'Đang giao'], done: ['green', 'Hoàn thành'], cancelled: ['red', 'Đã huỷ'],
      locked: ['red', 'Bị khoá'], admin: ['purple', 'Admin'], customer: ['blue', 'Khách hàng']
    };
    const [c, l] = map[s] || ['muted', s];
    return `<span class="chip chip-${c}">${l}</span>`;
  }

  function stars(n) { return '★'.repeat(Math.floor(n)) + '☆'.repeat(5 - Math.floor(n)) + ` <span style="color:var(--muted);font-size:11px;">(${n})</span>`; }

  function showToast(msg, type = 'success') {
    const t = document.getElementById('toast');
    const m = document.getElementById('toast-msg');
    t.className = 'notif-toast ' + type;
    t.querySelector('i').className = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
    m.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2800);
  }

  // ═══════════════════════════════════════════════
  // RENDER FUNCTIONS
  // ═══════════════════════════════════════════════
  function renderDashboardOrders() {
    const tb = document.getElementById('dashboard-orders');
    tb.innerHTML = ORDERS.slice(0, 5).map(o => `
  <tr>
    <td><span style="font-family:'JetBrains Mono';font-size:12px;color:var(--accent);">${o.code}</span></td>
    <td>${o.customer}</td>
    <td style="color:var(--muted);font-size:12.5px;">${o.product}</td>
    <td style="font-weight:700;color:var(--green);">${fmtPrice(o.total)}</td>
    <td>${statusChip(o.status)}</td>
    <td style="color:var(--muted);font-size:12px;">${o.date}</td>
    <td><button class="btn btn-ghost btn-sm btn-icon"><i class="fas fa-eye"></i></button></td>
  </tr>`).join('');
  }

  function renderProducts() {
    const tb = document.getElementById('products-table');
    tb.innerHTML = PRODUCTS.map(p => `
  <tr>
    <td><div class="product-cell">
      <div class="product-thumb">${p.emoji}</div>
      <div><div class="product-name">${p.name}</div><div class="product-brand">${p.brand} · ${p.id}</div></div>
    </div></td>
    <td>${p.cat}</td>
    <td style="color:var(--muted);text-decoration:line-through;font-size:12px;">${fmtPrice(p.price)}</td>
    <td style="font-weight:700;color:var(--accent);">${fmtPrice(p.sale)}</td>
    <td><span style="font-weight:600;color:${p.stock === 0 ? 'var(--red)' : p.stock < 10 ? 'var(--yellow)' : 'var(--green)'};">${p.stock}</span></td>
    <td style="color:var(--yellow);font-size:13px;">${stars(p.rating)}</td>
    <td>${statusChip(p.status)}</td>
    <td><div style="display:flex;gap:5px;">
      <button class="btn btn-ghost btn-sm btn-icon" title="Xem"><i class="fas fa-eye"></i></button>
      <button class="btn btn-ghost btn-sm btn-icon" title="Sửa"><i class="fas fa-pen"></i></button>
      <button class="btn btn-danger btn-sm btn-icon" title="Xoá"><i class="fas fa-trash"></i></button>
    </div></td>
  </tr>`).join('');
  }

  function renderOrders() {
    const tb = document.getElementById('orders-table');
    tb.innerHTML = ORDERS.map(o => `
  <tr>
    <td><span style="font-family:'JetBrains Mono';font-size:12px;color:var(--accent);">${o.code}</span></td>
    <td>${o.customer}</td>
    <td style="color:var(--muted);font-size:12.5px;">${o.product}</td>
    <td style="font-weight:700;color:var(--green);">${fmtPrice(o.total)}</td>
    <td><span class="chip chip-muted">${o.pay}</span></td>
    <td>${statusChip(o.status)}</td>
    <td style="color:var(--muted);font-size:12px;">${o.date}</td>
    <td><div style="display:flex;gap:5px;">
      <button class="btn btn-ghost btn-sm btn-icon"><i class="fas fa-eye"></i></button>
      <button class="btn btn-success btn-sm btn-icon" title="Duyệt"><i class="fas fa-check"></i></button>
      <button class="btn btn-danger btn-sm btn-icon" title="Huỷ"><i class="fas fa-times"></i></button>
    </div></td>
  </tr>`).join('');
  }

  function renderCoupons() {
    const g = document.getElementById('coupon-grid');
    g.innerHTML = COUPONS.map(c => `
  <div class="coupon-card">
    <div class="coupon-code">${c.code}</div>
    <div class="coupon-val">${c.type === 'percent' ? c.val + '%' : fmtPrice(c.val)}</div>
    <div class="coupon-info">
      Đơn tối thiểu: ${c.min ? fmtPrice(c.min) : 'Không'} · Hết hạn: ${c.expiry}
    </div>
    <div class="coupon-footer">
      <div>
        ${c.active ? '<span class="chip chip-green">Hoạt động</span>' : '<span class="chip chip-red">Hết hạn</span>'}
        <div class="coupon-uses" style="margin-top:5px;">Đã dùng: ${c.uses}/${c.max}</div>
      </div>
      <div class="coupon-actions">
        <button class="btn btn-ghost btn-sm btn-icon"><i class="fas fa-pen"></i></button>
        <button class="btn btn-danger btn-sm btn-icon"><i class="fas fa-trash"></i></button>
      </div>
    </div>
  </div>`).join('');
  }

  function renderUsers() {
    const tb = document.getElementById('users-table');
    tb.innerHTML = allUsers.map(u => `
  <tr>
    <td><div class="user-row-extra">
      <div class="user-avatar-sm">${u.username}</div>
      <span style="font-weight:600;">${u.fullName}</span>
    </div></td>
    <td style="color:var(--muted);font-size:12.5px;">${u.email}</td>
    <td style="color:var(--muted);">${u.phone}</td>
    <td>${statusChip(u.role)}</td>
    <td style="font-weight:600;">${u.orders === undefined ? 0 : u.orders}</td>
    <td>${statusChip(u.isActive === true ? 'Tốt' : 'Bị Khóa')}</td>
    <td style="color:var(--muted);font-size:12px;">${u.createdAt}</td>
    <td><div style="display:flex;gap:5px;">
      <button class="btn btn-ghost btn-sm btn-icon"><i class="fas fa-eye"></i></button>
      <button class="btn btn-danger btn-sm btn-icon" title="${u.isActive === false ? 'Mở khoá' : 'Khoá'}">
        <i class="fas fa-${u.isActive === false ? 'unlock' : 'lock'}"></i>
      </button>
    </div></td>
  </tr>`).join('');
  }

  function renderCategories() {
    const tb = document.getElementById('categories-table');
    tb.innerHTML = CATEGORIES.map(c => `
  <tr>
    <td style="font-weight:600;">${c.name}</td>
    <td><span style="font-family:'JetBrains Mono';font-size:12px;color:var(--muted);">${c.slug}</span></td>
    <td style="color:var(--muted);">${c.parent}</td>
    <td style="font-weight:600;">${c.count}</td>
    <td>${c.active ? '<span class="chip chip-green">Hiển thị</span>' : '<span class="chip chip-red">Ẩn</span>'}</td>
    <td><div style="display:flex;gap:5px;">
      <button class="btn btn-ghost btn-sm btn-icon"><i class="fas fa-pen"></i></button>
      <button class="btn btn-danger btn-sm btn-icon"><i class="fas fa-trash"></i></button>
    </div></td>
  </tr>`).join('');
  }

  function renderBarChart(id, data, months, color = 'var(--accent)') {
    const el = document.getElementById(id);
    if (!el) return;
    const max = Math.max(...data);
    el.innerHTML = months.map((m, i) => `
  <div class="bar-group">
    <div class="bar" style="height:${Math.round(data[i] / max * 100)}%;background:linear-gradient(to top,${color},rgba(79,127,255,.3));" title="${m}: ${data[i]}M₫"></div>
    <div class="bar-label">${m}</div>
  </div>`).join('');
  }

  // ═══════════════════════════════════════════════
  // NAVIGATION
  // ═══════════════════════════════════════════════
  const PAGE_TITLES = {
    dashboard: 'Dashboard', products: 'Quản Lý Sản Phẩm', orders: 'Quản Lý Đơn Hàng',
    coupons: 'Quản Lý Coupon', users: 'Quản Lý Người Dùng', revenue: 'Thống Kê Doanh Thu',
    categories: 'Quản Lý Danh Mục', profile: 'Hồ Sơ Cá Nhân'
  };
  const PAGE_SUBS = {
    dashboard: '/ Tổng quan', products: '/ CRUD Sản Phẩm', orders: '/ Xem & Cập Nhật',
    coupons: '/ CRUD Coupon', users: '/ Quản Lý', revenue: '/ Báo Cáo',
    categories: '/ CRUD Danh Mục', profile: '/ Tài Khoản Admin'
  };

  function navigate(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    const pg = document.getElementById('page-' + page);
    if (pg) pg.classList.add('active');
    document.querySelectorAll('[data-page="' + page + '"]').forEach(n => n.classList.add('active'));
    document.getElementById('topbar-title').innerHTML =
      `${PAGE_TITLES[page] || page} <span>${PAGE_SUBS[page] || ''}</span>`;
    // close mobile sidebar
    document.getElementById('sidebar').classList.remove('open');
  }

  document.querySelectorAll('.nav-item[data-page]').forEach(item => {
    item.addEventListener('click', () => navigate(item.dataset.page));
  });
  document.querySelectorAll('[data-page]').forEach(el => {
    if (el.tagName === 'BUTTON') {
      el.addEventListener('click', () => navigate(el.dataset.page));
    }
  });

  // ═══════════════════════════════════════════════
  // MODALS
  // ═══════════════════════════════════════════════
  function openModal(id) { document.getElementById(id).classList.add('open'); }
  function closeModal(id) { document.getElementById(id).classList.remove('open'); }

  document.getElementById('add-product-btn').addEventListener('click', () => openModal('modal-product'));
  document.getElementById('add-coupon-btn').addEventListener('click', () => openModal('modal-coupon'));

  document.querySelectorAll('[data-close]').forEach(btn => {
    btn.addEventListener('click', () => closeModal(btn.dataset.close));
  });
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) overlay.classList.remove('open');
    });
  });

  document.getElementById('submit-product').addEventListener('click', () => {
    closeModal('modal-product');
    showToast('Sản phẩm đã được thêm thành công!', 'success');
  });
  document.getElementById('submit-coupon').addEventListener('click', () => {
    closeModal('modal-coupon');
    showToast('Mã giảm giá đã được tạo!', 'success');
  });

  // ═══════════════════════════════════════════════
  // MISC
  // ═══════════════════════════════════════════════
  document.getElementById('hamburger-btn').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
  });

  document.getElementById('logout-btn').addEventListener('click', () => {
    showToast('Đã đăng xuất khỏi hệ thống.', 'success');
  });

  document.getElementById('save-profile-btn').addEventListener('click', () => {
    showToast('Hồ sơ đã được cập nhật!', 'success');
  });

  document.getElementById('notif-btn').addEventListener('click', () => {
    showToast('Bạn có 12 đơn hàng chờ xử lý!', 'success');
  });

  // ═══════════════════════════════════════════════
  // INIT
  // ═══════════════════════════════════════════════
  renderDashboardOrders();
  renderProducts();
  renderOrders();
  renderCoupons();
  renderUsers();
  renderCategories();
  renderBarChart('revenue-chart', [320, 415, 280, 520, 610, 480], ['T7', 'T8', 'T9', 'T10', 'T11', 'T12']);
  renderBarChart('full-revenue-chart', REV_DATA, MONTHS);
});