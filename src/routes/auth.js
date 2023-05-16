const passport = require('passport')
const { loginGoogle } = require('../controllers/authController')
const router = require('express').Router()

passport.serializeUser((user,done) => done(null,user))
passport.deserializeUser((user,done) => done(null,user))

/* /login/google */ 
router.get('/login/google',passport.authenticate('google'))
router.get('/google/callback', passport.authenticate('google',{failureRedirect: "users/login"}),loginGoogle)

module.exports = router