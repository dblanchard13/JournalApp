// Load necessary node packages
var express = require('express');
var passport = require('passport'); // Passport node package
var LocalStrategy = require('passport-local').Strategy; // LocalStrategy for username/password authentication

// Creating our express web server
var app = express();
// Set the port used by deployment site (Heroku) or default port 3000
var PORT = process.env.PORT || 3000;

// Express middleware that initializes Passport
app.configure(function() {
  app.use(express.static('public'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.session({ secret: ''})); // optional but recommended
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
});

// Passport Setup using LocalStrategy
passport.use(new LocalStrategy( function(username, password, done) {
  User.findOne({ username: username }, function(err, user) {
    if (err) { return: done(err); }
    
    if (!user) {
      return done(null, false, { message: "Incorrect username"});
    }
    if (!user.validPassword(password)) {
      return done(null, false, { message: "Incorrect password"});
    }
    // Verify Callback
    return done(null, user);
  });
}));

// Login Form route
app.use("/login", routes);

// Start our server
app.listen(PORT);
