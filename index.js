const express = require('express')
const mongoose = require('mongoose')
const keys = require('./config/keys')
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')
const passport = require('passport')

require('./models/User')
require('./models/Survey')
require('./services/passport')

mongoose.connect(keys.mongoURI, {
    useNewUrlParser:true
})

const app = express();

app.use(bodyParser.json())

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
require('./routes/billingRoutes')(app)
require('./routes/surveyRoutes')(app)

if (process.env.NODE_ENV === 'production') {
    // Express first checks the client/build if route isn't recognized.
    app.use(express.static('client/build'))

    // Express serves index.html if nothign matches. 
    const path = require('path')
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT)