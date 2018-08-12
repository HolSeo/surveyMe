const passport = require('passport')
const mongoose = require('mongoose')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys')

const User = mongoose.model('users')

// takes token and puts inside cookie and sends to browser.
// Browser takes cookie and attaches to req and sends to server.
passport.serializeUser((user, done) => {
    done(null,user.id);
})

// Server takes the cookie and turns it back to use model.
// User model instance is added to req object as req.user;
passport.deserializeUser( async (id,done) => {
    const user = await User.findById(id)
    done(null,user)
})

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: "/auth/google/callback",
},
    async (accessToken, refreshToken, profile, done) => {
        const existingUser = await User.findOne({ googleId: profile.id})
        if (existingUser) {
            return done(null, existingUser)
        }
        const user = await new User ({ googleId: profile.id }).save()
        done(null, user)
    }
));