module.exports = {
  //checks is the user is authenticated; if true, it redirects to the profile page.
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      req.flash('error_msg', 'Debés cerrar sesión para acceder a esa dirección.')
      return res.redirect('/profile');
    }
    next()
  },
  //checks if the user is logged in; if false, sends a message and redirects to sign in page
  forwardAuthenticated: function(req, res, next) {
    if (!req.isAuthenticated()) {
      req.flash('error_msg', 'Debés iniciar sesión para poder ver tu perfil.')
      return res.redirect('/signin');  
    }
    next()
  }
};
