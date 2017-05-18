// Middleware for restricting routes user is not allowed to visit if not logged in
module.exports = function(req, res, next) {
  // If user is logged in, continue with request
  if (req.user) {
    return next();
  }
  // If the user is NOT logged in, redirect to login page
  return res.redirect("/login");
};
