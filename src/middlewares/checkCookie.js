module.exports = (req,res,next) => {
    if(req.cookies.usernextgames){
        req.session.userLogin = req.cookies.usernextgames
    }

    next()
}