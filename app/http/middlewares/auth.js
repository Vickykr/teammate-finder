function auth(req,res,next) {
    if(req.session.isAuth)
    {
        next()
    }
    else {
        req.flash('error','Unauthorised access')
        res.redirect('/login')
    }
}

module.exports = auth 