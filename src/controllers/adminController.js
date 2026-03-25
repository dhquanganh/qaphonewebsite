const userModel = require('../models/User');

class AdminController {
    async adminPage(req, res, next) {
        try {
            res.render('adminPages/admin', { layout: false });
        }
        catch (error) {
            next(error);
        }
    }

    async getAllUsersAPI(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const keyword = req.query.keyword || '';
            const role = req.query.role || '';
            const status = req.query.status || '';
            const skip = (page - 1) * limit;

            const filter = {};

            if (keyword) {
                filter.$or = [
                    { fullName: { $regex: keyword, $options: 'i' } },
                    { email: { $regex: keyword, $options: 'i' } },
                    { username: { $regex: keyword, $options: 'i' } },
                ];
            }
            if (role) filter.role = role;
            if (status) filter.isActive = status === 'active';

            const [users, total] = await Promise.all([
                userModel.find(filter)
                    .select('-passwordHash')
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(limit),
                userModel.countDocuments(filter)
            ]);

            res.json({
                success: true,
                users,
                pagination: {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit),
                }
            });

        } catch (error) {
            next(error);
        }
    }

    async lockUserAPI(req, res, next) {
        try {
            const userId = req.body.userId;
            const getUser = await userModel.findById(userId);
            if (!getUser) {
                return res.json({ success: false, message: "Người dùng không tồn tại!" });
            }

            getUser.isActive = !getUser.isActive;
            await getUser.save();

            const message = getUser.isActive
                ? "Mở khóa tài khoản thành công!"
                : "Khóa tài khoản thành công!";
            res.json({ success: true, message });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new AdminController();