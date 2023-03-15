module.exports = (req,res,next) => {
    if(req.cookies.usernextgame){
        req.session.userLogin = req.cookies.usernextgame
    }

    next()
}