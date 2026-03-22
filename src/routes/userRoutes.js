const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get("/infor/:_id", authMiddleware.authMiddleware, userController.userInforPage);
router.put('/update/:_id', authMiddleware.authMiddleware, userController.updateUserInfor);
router.get('/api/find-user-by-id/:_id', authMiddleware.authMiddleware, userController.getUserByIdAPI);
router.post('/add-address/:_id', authMiddleware.authMiddleware, userController.createAddress);
router.delete('/delete-address/:_id/:address_id', authMiddleware.authMiddleware, userController.deleteAddress);

module.exports = router;

