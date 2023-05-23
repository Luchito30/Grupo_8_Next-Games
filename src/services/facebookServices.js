const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

const clientID = "774869420790758"
const clientSecret = "bbf7cc4c05d99dbe147e3384d554432e"
const callbackURL = "https://nextgames.onrender.com/auth/facebook/callback"

const strategyConfig = new FacebookStrategy(
    {
      clientID,
      clientSecret,
      callbackURL,
      profileFields: ['id', 'displayName', 'photos', 'email']
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile)
      
      done(null, profile)
    }
  );
  
  module.exports = {
    loginFacebookService: () => passport.use(strategyConfig),
  };