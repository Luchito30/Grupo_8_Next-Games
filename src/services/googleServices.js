const passport = require('passport')
const OAuth2Strategy = require('passport-google-oauth').OAuth2Strategy

const clientID = "619041089594-eslhkpst0jp03b8sk5a5lhjdvnakr8n4.apps.googleusercontent.com"
const clientSecret = "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"
const callbackURL = "https://nextgames.onrender.com/auth/google/callback"

const strategyConfing = new OAuth2Strategy({
    clientID,
    clientSecret,
    callbackURL,
    scope: ['profile','email']
},(accessToken,refreshToken,profile,done) => {
    console.log(profile)
    
    done(null,profile)
})

module.exports = {
    loginGoogleService : () => passport.use(strategyConfing)
} 