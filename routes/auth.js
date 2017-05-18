var authController = require('../controllers/authcontroller.js');
var passportConfig = require('../app/config/passport')

module.exports = function(app, passport) {
  passportConfig(passport)
  
  app.get('/', authController.signup);
  
  app.get('/login', authController.login);
  
  app.get('/signup', authController.journal);
  // app.post('/signup', function(req, res) {
  //   console.log(req.body)
  //   
  //   res.send('cake')
  // })
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/journal',
    failureRedirect: '/signup'
  }))//, (req, res) => { console.log(req.body); res.send('cake')}
  
  app.get('/journal', isLoggedIn, authController.journal);
  
  app.get('/logout', authController.logout);
  
  app.post('/', passport.authenticate('local-login', {
    successRedirect: '/journal',
    failureRedirect: '/signup'
    }
  ));
  
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
      return next();
    res.redirect('/signup');
  }
  
}
