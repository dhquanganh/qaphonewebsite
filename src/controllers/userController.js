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

    async setAddressDefaultByIdAPI(req, res, next) {
        try {
            const { _id } = req.params;
            const user = await User.findById(_id);
            if (!user) {
                return res.status(404).json({ success: false, error: 'User not found' });
            }
            const addressId = req.params.address_id;
            user.addresses.forEach(addr => addr.isDefault = false);
            user.addresses.filter(addr => addr._id.toString() === addressId).forEach(addr => addr.isDefault = true);
            await user.save();
            res.json({ success: true, messages: "Địa chỉ mặc định đã được cập nhật!" });
        } catch (error) {
            next(error);
        }
    }

    async updateAddressUserAPI(req, res, next) {
        try {
            const { _id } = req.params;
            const user = await User.findById(_id);
            if (!user) {
                return res.status(404).json({ success: false, error: 'User not found' });
            }
            const addressId = req.params.address_id;
            const addr = user.addresses.find(addr => addr._id.toString() === addressId);
            addr.name = req.body.name || addr.name;
            addr.phone = req.body.phone || addr.phone;
            addr.city = req.body.city || addr.city;
            addr.address = req.body.address || addr.address;
            await user.save();
            res.json({ success: true, messages: "Địa chỉ đã được cập nhật!" });
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