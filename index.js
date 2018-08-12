const express = require('express')
const mongoose = require('mongoose')
const keys = require('./config/keys')
const cookieSession = require('cookie-session')
const passport = require('passport')

require('./models/User')
require('./services/passport')

mongoose.connect(keys.mongoURI, {
    useNewUrlParser:true
})

const app = express();

// These three middlewares will run when request is made,
// cookie session extracts cookie data, assigns to req.session, then passport middlewares
// will pull userid out of req.session and passes to deserialize user, which will give back
// user model, addied to req obj and sent to route handlers. req.session contains ID given
// by MongoDB. cookie-session stores data directly, not by reference. 

app.use(
    cookieSession({
        maxAge: 30*24*60*60*1000,
        keys: [keys.cookieKey]
    })
)

app.use(passport.initialize())
app.use(passport.session())

require('./routes/authRoutes')(app)

app.get('/', (req,res) => {
    res.send('HELLO WORLD!')
})

const PORT = process.env.PORT || 5000;
app.listen(PORT)