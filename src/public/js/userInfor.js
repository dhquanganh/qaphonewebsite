
// ── DATA ──────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
    const createAddressBtn = document.getElementById('save-addr-btn');
    createAddressBtn.addEventListener('click', () => {
        fetch(`/user/add-address/${userId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: document.getElementById('addr-name').value,
                phone: document.getElementById('addr-phone').value,
                city: document.getElementById('addr-city').value,
                address: document.getElementById('addr-detail').value,
            }),
        }).then(res => res.json()).then(data => {
            showToast(data.messages, 'success');
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }).catch(err => {
            showToast('Có lỗi xảy ra khi thêm địa chỉ.' + err, 'error');
        });
    });
    const userId = document.getElementById('save-info').getAttribute('data-userId');
    const getuser = await Promise.all([
        fetch(`/user/api/find-user-by-id/${userId}`).then(r => r.json())
    ]);
    const user = getuser[0].user;

    const ADDRESSES = [
        { id: 1, name: 'Nguyễn Thị Lan', phone: '0901 234 567', detail: '12 Nguyễn Huệ, Phường Bến Nghé', city: 'Quận 1, TP. Hồ Chí Minh', isDefault: true },
        { id: 2, name: 'Nguyễn Thị Lan', phone: '0901 234 567', detail: '88 Lê Lợi, Phường Bến Thành', city: 'Quận 1, TP. Hồ Chí Minh', isDefault: false },
    ];

    const ORDERS_DATA = [
        { code: 'ORD-2401', product: 'iPhone 15 Pro Max 256GB', total: 32990000, status: 'done', date: '20/01/2025' },
        { code: 'ORD-2389', product: 'Samsung Galaxy S24 Ultra', total: 27500000, status: 'shipping', date: '15/01/2025' },
        { code: 'ORD-2341', product: 'Xiaomi 14 Pro 512GB', total: 17490000, status: 'done', date: '02/01/2025' },
        { code: 'ORD-2298', product: 'Oppo Find X7 Ultra', total: 21490000, status: 'cancelled', date: '18/12/2024' },
    ];

    // ── HELPERS ───────────────────────────
    function fmtPrice(n) {
        return new Intl.NumberFormat('vi-VN').format(n) + '₫';
    }

    function statusChip(s) {
        const map = {
            done: ['#dcfce7', '#16a34a', 'Hoàn thành'],
            shipping: ['#dbeafe', '#1d4ed8', 'Đang giao'],
            pending: ['#fef9c3', '#a16207', 'Chờ xử lý'],
            cancelled: ['#fee2e2', '#dc2626', 'Đã huỷ'],
        };
        const [bg, color, label] = map[s] || ['#f1f5f9', '#64748b', s];
        return `<span style="display:inline-flex;align-items:center;gap:4px;padding:3px 10px;border-radius:20px;font-size:11.5px;font-weight:600;background:${bg};color:${color};">${label}</span>`;
    }

    function showToast(msg, type = 'success') {
        const t = document.getElementById('toast');
        const icon = t.querySelector('.toast-icon');
        t.querySelector('.toast-msg').textContent = msg;
        t.className = 'toast ' + type;
        icon.className = 'toast-icon fas ' + (type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle');
        t.classList.add('show');
        setTimeout(() => t.classList.remove('show'), 2800);
    }

    // ── POPULATE SELECTS ──────────────────


    // ── TABS ──────────────────────────────
    function switchTab(tab) {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        document.querySelectorAll('.menu-item[data-tab]').forEach(m => m.classList.remove('active'));

        document.querySelectorAll('[data-tab="' + tab + '"]').forEach(el => {
            el.classList.add('active');
        });
        const panel = document.getElementById('panel-' + tab);
        if (panel) panel.classList.add('active');
    }

    document.querySelectorAll('.tab-btn[data-tab]').forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });
    document.querySelectorAll('.menu-item[data-tab]').forEach(item => {
        item.addEventListener('click', () => switchTab(item.dataset.tab));
    });

    // ── GENDER ────────────────────────────
    document.querySelectorAll('.gender-opt').forEach(opt => {
        opt.addEventListener('click', () => {
            document.querySelectorAll('.gender-opt').forEach(o => o.classList.remove('selected'));
            opt.classList.add('selected');
            opt.querySelector('input').checked = true;
        });
    });

    // ── PASSWORD TOGGLE ───────────────────
    document.querySelectorAll('.toggle-pw').forEach(btn => {
        btn.addEventListener('click', () => {
            const input = document.getElementById(btn.dataset.target);
            const icon = btn.querySelector('i');
            if (input.type === 'password') {
                input.type = 'text';
                icon.className = 'fas fa-eye-slash';
            } else {
                input.type = 'password';
                icon.className = 'fas fa-eye';
            }
        });
    });

    // ── PASSWORD STRENGTH ─────────────────
    document.getElementById('new-pw').addEventListener('input', function () {
        const val = this.value;
        const str = document.getElementById('pw-strength');
        const bars = [document.getElementById('bar1'), document.getElementById('bar2'),
        document.getElementById('bar3'), document.getElementById('bar4')];
        const label = document.getElementById('pw-label');

        if (!val) { str.style.display = 'none'; return; }
        str.style.display = 'block';

        let score = 0;
        if (val.length >= 8) score++;
        if (/[A-Z]/.test(val)) score++;
        if (/[0-9]/.test(val)) score++;
        if (/[^A-Za-z0-9]/.test(val)) score++;

        bars.forEach((b, i) => {
            b.className = 'pw-bar';
            if (i < score) {
                b.classList.add(score <= 1 ? 'weak' : score <= 2 ? 'medium' : score <= 3 ? 'medium' : 'strong');
            }
        });

        const [cls, txt] = score <= 1 ? ['weak', 'Yếu'] : score <= 3 ? ['medium', 'Trung bình'] : ['strong', 'Mạnh'];
        label.className = 'pw-label ' + cls;
        label.textContent = 'Độ mạnh: ' + txt;
    });

    // ── ADDRESS RENDER ────────────────────
    function renderAddresses() {
        const list = document.getElementById('address-list');
        list.innerHTML = user.addresses.map(a => `
    <div class="address-card ${a.isDefault ? 'default' : ''}">
      <div class="addr-radio"></div>
      <div class="addr-body">
        <div class="addr-name">
          ${a.name} · ${a.phone}
          ${a.isDefault ? '<span class="addr-default-tag"><i class="fas fa-check" style="font-size:8px;"></i> Mặc định</span>' : ''}
        </div>
        <div class="addr-detail">${a.address}<br>${a.city}</div>
        <div class="addr-actions">
          <button class="btn btn-ghost btn-sm"><i class="fas fa-pen"></i> Sửa</button>
          ${!a.isDefault ? '<button class="btn btn-ghost btn-sm">Đặt mặc định</button>' : ''}
          ${!a.isDefault ? '<button data-addr-id="' + a._id + '" class="btn btn-danger btn-sm address-item"><i class="fas fa-trash"></i></button>' : ''}
        </div>
      </div>
    </div>`).join('');
    }
    if (user && user.addresses) {
        renderAddresses();
    }
    const editAddrBtns = document.querySelectorAll('.address-item');
    editAddrBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const addrId = btn.getAttribute('data-addr-id');
            fetch(`/user/delete-address/${userId}/${addrId}`, {
                method: 'DELETE',
            }).then(res => res.json()).then(data => {
                showToast(data.messages, 'success');
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }).catch(err => {
                showToast('Có lỗi xảy ra khi xóa địa chỉ.' + err, 'error');
            }
            );
        });
    });


    // ── ORDERS RENDER ─────────────────────
    (function renderOrders() {
        const tb = document.getElementById('orders-tbody');
        tb.innerHTML = ORDERS_DATA.map(o => `
    <tr style="border-top:1px solid var(--border);transition:background .15s;" onmouseenter="this.style.background='#f8fafc'" onmouseleave="this.style.background=''">
      <td style="padding:14px 20px;font-weight:700;font-size:12.5px;color:var(--blue);">${o.code}</td>
      <td style="padding:14px 16px;font-size:13px;">${o.product}</td>
      <td style="padding:14px 16px;font-weight:700;color:#16a34a;">${fmtPrice(o.total)}</td>
      <td style="padding:14px 16px;">${statusChip(o.status)}</td>
      <td style="padding:14px 16px;color:var(--muted);font-size:12.5px;">${o.date}</td>
    </tr>`).join('');
    })();

    // ── SAVE INFO ─────────────────────────
    document.getElementById('save-info').addEventListener('click', () => {
        const email = document.getElementById('email').value.trim();
        const emailErr = document.getElementById('email-error');
        const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailReg.test(email)) {
            document.getElementById('email').classList.add('error');
            emailErr.classList.add('show');
            return;
        }
        document.getElementById('email').classList.remove('error');
        emailErr.classList.remove('show');

        // Update sidebar
        const first = document.getElementById('firstName').value.trim();
        const last = document.getElementById('lastName').value.trim();
        const full = last + ' ' + first;
        document.getElementById('sidebar-name').textContent = full;
        document.getElementById('sidebar-email').textContent = email;
        const initials = (last[0] || '') + (first[0] || '');
        document.getElementById('avatar-letter').textContent = initials.toUpperCase();
        fetch(`/user/update/${userId}?_method=PUT`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fullName: first, email }),
        }).then(res => res.json()).then(data => {
            showToast(data.messages, 'success');
            console.log(data);
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }).catch(err => {
            showToast('Có lỗi xảy ra khi cập nhật thông tin.' + err, 'error');
        });
    });

    document.getElementById('reset-info').addEventListener('click', () => {
        document.getElementById('lastName').value = 'Nguyễn Thị';
        document.getElementById('firstName').value = 'Lan';
        document.getElementById('email').value = 'lan.nguyen@gmail.com';
        document.getElementById('phone').value = '901 234 567';
        showToast('Đã đặt lại thông tin.', 'success');
    });

    // ── SAVE PASSWORD ─────────────────────
    document.getElementById('save-password').addEventListener('click', () => {
        const cur = document.getElementById('current-pw').value;
        const nw = document.getElementById('new-pw').value;
        const conf = document.getElementById('confirm-pw').value;
        let valid = true;

        [['current-pw', 'current-pw-error', v => v.length >= 1, 'Vui lòng nhập mật khẩu hiện tại.'],
        ['new-pw', 'new-pw-error', v => v.length >= 8, 'Mật khẩu tối thiểu 8 ký tự.'],
        ].forEach(([id, errId, check, msg]) => {
            const el = document.getElementById(id);
            const err = document.getElementById(errId);
            if (!check(el.value)) {
                el.classList.add('error');
                err.textContent = msg;
                err.classList.add('show');
                valid = false;
            } else {
                el.classList.remove('error');
                err.classList.remove('show');
            }
        });

        const confErr = document.getElementById('confirm-pw-error');
        if (nw !== conf) {
            document.getElementById('confirm-pw').classList.add('error');
            confErr.classList.add('show');
            valid = false;
        } else {
            document.getElementById('confirm-pw').classList.remove('error');
            confErr.classList.remove('show');
        }

        if (valid) {
            ['current-pw', 'new-pw', 'confirm-pw'].forEach(id => document.getElementById(id).value = '');
            document.getElementById('pw-strength').style.display = 'none';
            showToast('Mật khẩu đã được cập nhật!', 'success');
        }
    });

    // ── ADDRESS FORM ──────────────────────
    document.getElementById('add-addr-btn').addEventListener('click', () => {
        document.getElementById('addr-form').style.display = 'block';
    });
    document.getElementById('cancel-addr-btn').addEventListener('click', () => {
        document.getElementById('addr-form').style.display = 'none';
    });
    document.getElementById('save-addr-btn').addEventListener('click', () => {
        document.getElementById('addr-form').style.display = 'none';
        showToast('Địa chỉ đã được thêm!', 'success');
    });

    // ── LOGOUT ────────────────────────────
    document.getElementById('logout-menu').addEventListener('click', () => {
        showToast('Đã đăng xuất khỏi tài khoản.', 'success');
    });

    // ── AVATAR ────────────────────────────
    document.getElementById('avatar-edit-btn').addEventListener('click', () => {
        showToast('Tính năng upload ảnh sẽ sớm có!', 'success');
    });
});