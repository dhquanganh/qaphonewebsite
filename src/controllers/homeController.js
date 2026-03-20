
class HomeController {
    homePage(req, res){
        res.render('pages/home');
    }
}   

module.exports = new HomeController();