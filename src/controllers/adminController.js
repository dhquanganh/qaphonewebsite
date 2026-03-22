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
            const users = await userModel.find({ isActive: true });
            res.json(users);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new AdminController();