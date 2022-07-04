module.exports = (req, res, next) => {
    if(!req.session.isAuthenticated)
        return res.redirect('/auth/login');

    res.locals.role = req.session.role;
    res.locals.user_id = req.session.user_id;

    next();
}