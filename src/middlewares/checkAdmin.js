module.exports = (req, res, next) => {
    if (req.session.userLogin && req.session.userLogin.rol === 1) {
      // User is logged in and has admin permissions
      next();
    } else {
      // User is not logged in or does not have admin permissions
      return res.redirect('/login');
    }
  }
  