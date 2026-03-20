const express = require('express');
const loginController = require('../controllers/loginController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Routes cho login/register
router.get('/login', loginController.loginPage);
router.get('/register', loginController.register);
router.post('/register-submit', loginController.registerPost.bind(loginController));
router.post('/login-submit', loginController.loginPost.bind(loginController));

// Routes cho refresh token (không cần auth)
router.post('/refresh-token', loginController.refreshTokenPost.bind(loginController));

// Routes cho user đã đăng nhập
router.post('/logout', authMiddleware, loginController.logout.bind(loginController));

module.exports = router;

