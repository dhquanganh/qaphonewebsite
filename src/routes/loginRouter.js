const express = require('express');
const loginController = require('../controllers/loginController');

const router = express.Router();

router.get('/login', loginController.loginPage);
router.get('/register', loginController.register);
router.post('/register-submit', loginController.registerPost);


module.exports = router;

