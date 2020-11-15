const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            callbackURL:
                process.env.GOOGLE_CALLBACK ||
                process.env.GOOGLE_CALLBACK_GLOBAL,
        },
        function (accessToken, refreshToken, profile, cb) {
            // User logged in via Google Oauth
            User.findOne({ googleId: profile.id }, function (err, user) {
                if (err) return cb(err);
                if (user) {
                    return cb(null, user);
                } else {
                    const newUser = new User({
                        username: profile.displayName,
                        email: profile.emails[0].value,
                        googleId: profile.id,
                    });
                    newUser.save(function (err) {
                        if (err) return cb(err);
                        return cb(null, newUser);
                    });
                }
            });
        }
    )
);

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});
