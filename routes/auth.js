var authController = require('../controllers/authcontroller.js');

module.exports = function(app, passport) {
  
  app.get('/signup', authController.signup);
  
  app.get('/login', authController.login);
  
  app.post('/signup', passport.authenticate('local-signup', {
      successRedirect: '/journal',
      failureRedirect: '/signup'
    }
  ));
  
}
