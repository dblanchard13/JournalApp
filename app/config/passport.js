var passport = require('passport');
var LocalStrategy = require("passport-local").Strategy;

// var db = require('../models');

passport.use(new LocalStrategy(
  {
    username: "username"
  },
  function(username, password, done) {
    db.User.findOne({
      where: {
        username: username
      }
    }).then(function(dbUser) {
      if (!dbUser) {
        return done(null, false, {
          message: "Incorrect username"
        });
      }
      else if (!dbUser.validPassword(password)) {
        return done(null, false, {
          message: "Incorrect password"
        });
      }
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

module.exports = passport;
