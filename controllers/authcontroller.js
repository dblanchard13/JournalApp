var exports = module.exports = {}

exports.signup = function(req, res) {
  
  res.render('signup');
  
}

exports.login = function(req, res) {
  
  res.render('login');
  
}

exports.journal = function(req, res) {
  
  res.render('journal');
  
}

exports.logout = function(req, res) {
  
  req.session.destroy(function(err) {
    res.redirect('/');
  });
  
}