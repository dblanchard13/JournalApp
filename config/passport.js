// Passport node package
var passport = require('passport'); 
// LocalStrategy for username/password authentication
var LocalStrategy = require('passport-local').Strategy; 

var db = require ('../models');

// Instructing Passport to use Local Strategy (username and password)
passport.use(new LocalStrategy(
  {
    // Username field
    username: "username"
  },
  function(username, password, done) {
    // When the user attempts to log in this code runs
    db.User.findOne({
      where: {
        user: username
      }
    }).then(function(dbUser) {
      // If there is no user by this username
      if (!dbUser) {
        return done(null, false, {
          message: "Incorrect username"
        });
      }
      // If there is a user by this username but incorrect password
      else if (!dbUser.validPassword(password)) {
        return done(null, false, {
          message: "Incorrect password"
        });
      }
      // If none of the conditions above are true, return the user
      return done(null, dbUser);
    });
  }
));

passport.serializeUser(function(user, callback) {
  callback(null, user);
});

passport.deserializeUser(function(obj, callback) {
  callback(null, obj);
});

// Export passport configurations
module.exports = passport;