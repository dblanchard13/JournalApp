var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var env = require('dotenv').load();

// Configuring port and models
var PORT = process.env.PORT || 8080;
var models = require('./app/models');

// Express App and Middleware for authentication
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("./public"));

// Set handlebars
var exphbs = require('express-handlebars');
app.set('views', './views');
app.engine('handlebars', exphbs({ extname: '.handlebars'}));
app.set('view engine', '.handlebars');

// To track user login status we use sessions
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Load Passport Strategies
require('./config/passport.js')(passport, models.user);

// Loading our routes
var authRoute = require('./routes/auth.js')(app, passport);

// app.get('/', function(req,res) {
//   res.sendFile(__dirname + '/public/login.html');
// });
// 
// app.get('/journal', function(req,res) {
//   res.sendFile(__dirname + '/public/journalapp.html');
// });
// 
// app.post('/login', passport.authenticate('local', {successRedirect: '/', failureRedirect: '/login', failureFlash: true}));

// Sync database
models.sequelize.sync().then(function() {
  console.log("Database Connected")
}).catch(function(err) {
  console.log(err, "Database Error")
});

// Start our server
app.listen(PORT, function(err) {
  if (err) throw err;
  console.log("App listening on:%s", PORT);
});
