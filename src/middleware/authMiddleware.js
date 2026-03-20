const jwt = require('jsonwebtoken');

// Middleware kiểm tra user đã đăng nhập (có JWT access token)
const authMiddleware = (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;

        if (!accessToken) {
            // Nếu là AJAX request, return JSON
            if (req.xhr || req.get('accept') === 'application/json') {
                return res.status(401).json({
                    success: false,
                    error: 'Unauthorized - No access token'
                });
            }
            // Ngược lại redirect về login
            return res.redirect('/auth/login');
        }

        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                error: 'Access token expired, please refresh'
            });
        }

        return res.status(401).json({
            success: false,
            error: 'Unauthorized - Invalid access token'
        });
    }
};

module.exports = authMiddleware;
