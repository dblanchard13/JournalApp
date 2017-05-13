// Load necessary node packages
var express = require('express');
var bodyParser = require('body-parser');
var passport = require('./config/passport.js');

// Set the port used by deployment site (Heroku) or default port 3000
var PORT = process.env.PORT || 3000;
var db = require('./models');

// Creating our express web server and middleware for authentication
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("/public"));

// Using sessions to keep track of user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Login Form route
app.use("/login", routes);

// Syncing database starting our server
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("Listening on PORT %s", PORT);
  });
});
