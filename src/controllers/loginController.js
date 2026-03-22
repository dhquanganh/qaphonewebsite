const userModel = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class LoginController {
  loginPage(req, res) {
    res.render('pages/login');
  }

  register(req, res) {
    res.render('pages/register');
  }

  async registerPost(req, res, next) {
    try {
      const { username, email, password } = req.body;
      const existingUser = await userModel.findOne({
        $or: [{ username }, { email }]
      });

      if (existingUser) {
        const duplicateField = existingUser.username === username ? 'username' : 'email';
        return res.status(400).json({
          success: false,
          error: `${duplicateField} already exists`
        });
      }
      const hashedPassword = await bcrypt.hash(password, 9);
      const newUser = new userModel({ username, email, passwordHash: hashedPassword });
      await newUser.save();
      res.redirect('/auth/login');
    } catch (error) {
      next(error);
    }
  }

  // Hàm tạo tokens
  generateTokens(user) {
    const accessToken = jwt.sign(
      {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    const refreshToken = jwt.sign(
      {
        _id: user._id,
        username: user.username
      },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '30d' }
    );

    return { accessToken, refreshToken };
  }

  async loginPost(req, res, next) {
    try {
      const { email, password } = req.body;

      // Tìm user theo email
      const user = await userModel.findOne({ email });

      if (!user) {
        return res.status(401).json({
          success: false,
          error: 'Email or password is incorrect'
        });
      }

      // So sánh password
      const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          error: 'Email or password is incorrect'
        });
      }

      // Tạo tokens
      const { accessToken, refreshToken } = this.generateTokens(user);

      // Lưu refresh token vào DB
      user.refreshTokens.push(refreshToken);
      await user.save();

      // Lưu tokens vào cookies
      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000 // 1 hour
      });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
      });

      res.redirect('/');
    } catch (error) {
      next(error);
    }
  }

  async refreshTokenPost(req, res, next) {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        return res.status(401).json({
          success: false,
          error: 'Refresh token not provided'
        });
      }

      // Xác thực refresh token
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      const user = await userModel.findById(decoded._id);

      if (!user || !user.refreshTokens.includes(refreshToken)) {
        return res.status(401).json({
          success: false,
          error: 'Invalid refresh token'
        });
      }

      // Tạo tokens mới
      const { accessToken, refreshToken: newRefreshToken } = this.generateTokens(user);

      // Cập nhật refresh token trong DB
      user.refreshTokens = user.refreshTokens.filter(token => token !== refreshToken);
      user.refreshTokens.push(newRefreshToken);
      await user.save();

      // Cập nhật cookies
      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000 // 1 hour
      });

      res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
      });

      res.json({
        success: true,
        message: 'Tokens refreshed successfully',
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      return res.status(401).json({
        success: false,
        error: 'Invalid or expired refresh token'
      });
    }
  }

  async logout(req, res, next) {
    try {
      const refreshToken = req.cookies.refreshToken;
      const user = req.user;

      if (refreshToken && user) {
        // Xóa refresh token khỏi DB
        await userModel.findByIdAndUpdate(
          user._id,
          { $pull: { refreshTokens: refreshToken } }
        );
      }

      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');

      res.json({
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new LoginController();

