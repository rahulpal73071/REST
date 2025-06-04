const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const User = require("../models/thirdAuthy");

passport.use(
  new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      let user = await User.findOne({ providerId: profile.id, provider: 'google' });
      if (!user) {
        user = await User.create({
          provider: 'google',
          providerId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          avatar: profile.photos[0].value
        });
      }
      done(null, user);
    }
  )
);

passport.use(
  new GitHubStrategy({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      let user = await User.findOne({ providerId: profile.id, provider: 'github' });
      if (!user) {
        user = await User.create({
          provider: 'github',
          providerId: profile.id,
          name: profile.displayName || profile.username,
          email: profile.emails?.[0]?.value || '',
          avatar: profile.photos?.[0]?.value || ''
        });
      }
      done(null, user);
    }
  )
);

// Session handling
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
