const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

require('./services/passport')

const app = express();

app.use(passport.initialize())
app.use(passport.session())

require('./routes/authRoutes')(app)

app.get('/', (req,res) => {
    res.send('HELLO WORLD!')
})

const PORT = process.env.PORT || 5000;
app.listen(PORT)