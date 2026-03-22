const jwt = require('jsonwebtoken');

// Middleware kiểm tra user đã đăng nhập (có JWT access token)
class AuthMiddleware {
    async authMiddleware(req, res, next) {
        try {
            const accessToken = req.cookies.accessToken;

            if (!accessToken) {
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

    async isAdmin(req, res, next) {
        if (req.user && req.user.role === 'admin') {
            next();
        } else {
            return res.status(403).json({
                user: req.user,
                success: false,
                error: 'Forbidden - Admins only'
            });
        }
    };
}

module.exports = new AuthMiddleware();
