module.exports = (req,res,next) => {
    if(req.session.userLogin && req.session.userLogin.rol === "admin"){
        next()
    }
    next()
    //return res.redirect('/')
}   