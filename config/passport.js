var bcrypt = require('bcrypt-nodejs');

module.exports = function(passport, user) {
  
  var User = user;
  var LocalStrategy = require('passport-local').Strategy;
  
  passport.use('local-signup', new LocalStrategy(
    
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    },
    
    function(req, username, password, done) {
      
      var generateHash = function(password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
      };
      
      User.findOne({
        where: {
          username: username
        }
      }).then(function(user) {
        if (user) {
          return done(null, false, { message: "That username is already in use"});
        } else {
          var userPassword = generateHash(password);
          var data = 
          {
            username: username,
            password: userPassword,
          };
        User.create(data).then(function(newUser, created) {
          if (!newUser) {
            return done(null, false);
          }
          if (newUser) {
            return done(null, newUser);
          }
        });
          
        }
      });
      
    }
    
  ));
  
}


