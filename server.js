//we only want to upload env variables we created on development, not on production; that's why we check if we're not on production
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const initializePassport = require('./config/passport')
const app = express()

//Initialices the way to authenticate the user from the login
initializePassport(passport)

//Imports the routes to be used
const indexRouter = require('./routes/index')
const signupRouter = require('./routes/signup')
const signinRouter = require('./routes/signin')
const aboutusRouter = require('./routes/about-us')
const profileRouter = require('./routes/profile')
const appointmentRouter = require('./routes/appointment')

//Configuration

//sets the view engine, express will now it'll be ejs
app.set('view engine', 'ejs')
//sets the path to the views
app.set('views', __dirname + '/views')
//sets the path to where our static (meaning public) files are gonna be located
app.use(express.static('public'))
//allows to get data send to the server from req.body. It's set to false because server will only get string or array
app.use(bodyParser.urlencoded({
    extended: false
}))
//sets flash, for messages when there's a redirect
app.use(flash())
//sets session, which allows to create a session cookie
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}))
//Allows to authenticate the user from the login
app.use(passport.initialize())
//Sets the passport with session
app.use(passport.session())

// Global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next()
})

//Connection to db; params are needed according to documentation
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
//Creates variable to reference to the db connection
const db = mongoose.connection
//Emitted if an error occurs on the initial connection
db.on('err', err => console.error(err))
//Emitted when Mongoose starts making its initial connection to the MongoDB server
db.once('open', () => console.log('Successfully connected to MongoDB'))


//tells express which router will handle the request
app.use('/', indexRouter)
app.use('/signup', signupRouter)
app.use('/signin', signinRouter)
app.use('/about-us', aboutusRouter)
app.use('/profile', profileRouter)
app.use('/appointment', appointmentRouter)

//404, resource not found
app.use((req, res, next) => {
    res.status(404).render('pages/error');
})

//sets the port in which to listen; the server is going to tell us which port to listen (when it's deployed), but for development reason, we're gonna use port 3000
app.listen(process.env.PORT || 3000)