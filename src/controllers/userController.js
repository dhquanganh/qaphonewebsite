const User = require('../models/User');

class UserController {
    async userInforPage(req, res) {
        const user = await User.findById(req.params._id);
        res.render('pages/userInfor', { user });
    }

    async getUserByIdAPI(req, res, next) {
        try {
            const { _id } = req.params;
            const user = await User.findById(_id);
            if (!user) {
                return res.status(404).json({ success: false, error: 'User not found' });
            }
            res.json({ success: true, user });
        } catch (error) {
            next(error);
        }
    }

    async createAddress(req, res, next) {
        try {
            const { _id } = req.params;
            const user = await User.findById(_id);
            if (!user) {
                return res.status(404).json({ success: false, error: 'User not found' });
            }
            user.addresses.push({
                name: req.body.name,
                phone: req.body.phone,
                city: req.body.city,
                address: req.body.address,
            })
            await user.save();
            res.json({ success: true, messages: 'Địa chỉ đã được thêm!' });
        } catch (error) {
            next(error);
        }
    }

    async deleteAddress(req, res, next) {
        try {
            const { _id } = req.params;
            const user = await User.findById(_id);
            if (!user) {
                return res.status(404).json({ success: false, error: 'User not found' });
            }
            const addressId = req.params.address_id;
            user.addresses = user.addresses.filter(addr => addr._id.toString() !== addressId);
            await user.save();
            res.json({ success: true, messages: 'Địa chỉ đã được xóa!' });
        } catch (error) {
            next(error);
        }
    }

    async updateUserInfor(req, res, next) {
        try {
            const { _id } = req.params;
            const user = await User.findById(_id);
            if (!user) {
                return res.status(404).json({ success: false, error: 'User not found' });
            }
            user.fullName = req.body.fullName || user.fullName;
            user.phone = req.body.phone || user.phone;
            await user.save();
            res.json({ success: true, messages: 'Thông Tin Đã Được Cập Nhật!' });
        }
        catch (error) {
            next(error);
        }
    }
}

module.exports = new UserController();