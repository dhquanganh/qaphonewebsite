class LoginController {
  loginPage(req, res) {
    res.render('pages/login');
  }
  
  register(req, res){
    res.render('pages/register');
  }

  async registerPost(req, res, next){
    try {
      res.json(req.body);
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new LoginController();

