const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

const clientID = "633357834994765"
const clientSecret = "a4e279e07cb38ca386f649a3479ffb00"
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