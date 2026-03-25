const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

router.get("/api/get-all-users", authMiddleware.authMiddleware, authMiddleware.isAdmin, adminController.getAllUsersAPI);
router.patch("/api/lock-user/:_id", authMiddleware.authMiddleware, authMiddleware.isAdmin, adminController.lockUserAPI);
router.get("/", authMiddleware.authMiddleware, authMiddleware.isAdmin, adminController.adminPage);

module.exports = router;