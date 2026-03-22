// Hàm logout
async function logout() {
    try {
        const response = await fetch('/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (data.success) {
            window.location.href = '/auth/login';
        } else {
            alert('Logout failed: ' + data.error);
        }
    } catch (error) {
        console.error('Logout error:', error);
        alert('Logout error');
    }
}

// Thêm event listener cho logout button khi trang load
document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
});

// Hàm refresh token khi access token sắp hết hạn (optional)
async function refreshAccessToken() {
    try {
        const response = await fetch('/auth/refresh-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (!data.success) {
            // Redirect về login nếu refresh token cũng hết hạn
            window.location.href = '/auth/login';
        }
    } catch (error) {
        console.error('Refresh token error:', error);
        window.location.href = '/auth/login';
    }
}

// Tự động refresh token mỗi 50 phút (access token hết hạn 60 phút)
setInterval(() => {
    refreshAccessToken();
}, 50 * 60 * 1000);
