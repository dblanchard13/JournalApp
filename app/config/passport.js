var bcrypt = require('bcrypt-nodejs');
var db = require('../models')

module.exports = function(passport) {
  
  var User = db.user

  var LocalStrategy = require('passport-local').Strategy;
  console.log('User');

  passport.serializeUser(function(user, done) {
    console.log('serializing')
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    console.log('deserializing')
    User.findById(id).then(function(user) {
      if (user) {
        done(null, user.get());
      }
      else {
        done(user.errors, null);
      }
    });
  });
  
  passport.use('local-signup', new LocalStrategy(
    
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    },
    
    function(req, username, password, done) {

      var generateHash = function(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
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
      })
      .catch(function(err) {
        console.log('error: ', err)
        done(err)
      })
      
    }
    
  ));
  
  passport.use('local-login', new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    },
    
    function(req, username, password, done) {
      var User = user;
      var isValidPassword = function(userpass, password) {
        return bcrypt.compareSync(password, userpass);
      }
      User.findOne({
        where: {
          username: username
        }
      }).then(function(user) {
        if (!user) {
          return done(null, false, {
            message: "Username does not exist"
          });
        }
        if (!isValidPassword(user.password, password)) {
          return done(null, false, {
            message: 'Incorrect password'
          }); 
        }
        var userinfo = user.get();
        return done(null, userinfo);
      }).catch(function(err) {
        console.log("Error:", err);
        return done(null, false, {
          message: "Error with Sign Up. Please try again."
        });
      });
    }
  ));
  
}
