const jwt = require('jsonwebtoken');

// Middleware để gắn thông tin user vào res.locals (nếu có token)
// Không bắt buộc - nếu không có token thì user sẽ null
const setUserMiddleware = (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;

        if (accessToken) {
            const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
            res.locals.user = decoded;
        } else {
            res.locals.user = null;
        }
    } catch (error) {
        res.locals.user = null;
    }

    next();
};

module.exports = setUserMiddleware;
