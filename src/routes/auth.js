const passport = require('passport')
const { loginGoogle, loginFacebook } = require('../controllers/authController')
const router = require('express').Router()

passport.serializeUser((user,done) => done(null,user))
passport.deserializeUser((user,done) => done(null,user))

/* /login/google */ 
router.get('/login/google',passport.authenticate('google'))
router.get('/google/callback', passport.authenticate('google',{failureRedirect: "users/login"}),loginGoogle)

router.get('/login/facebook',
  passport.authenticate('facebook', { scope: 'email' }));

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: 'users/login' }), loginFacebook);


module.exports = router