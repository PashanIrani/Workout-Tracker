module.exports = {
  // checks authentication by viewing session values
  isAuthenticated: (req, res, next) => {
    if (req.session.authenticated) next();
    else res.status(401).redirect("/login");
  },
};
