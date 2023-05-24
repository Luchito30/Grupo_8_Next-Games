const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

const clientID = process.env.FACEBOOK_CLIENT_ID
const clientSecret = process.env.FACEBOOK_SECRET_KEY
const callbackURL = process.env.FACEBOOK_CALLBACK_URL

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