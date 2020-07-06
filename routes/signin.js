const express = require('express')
const router = express.Router()
const passport = require('passport');
const { ensureAuthenticated } = require('../config/auth')

//Sign in form page; checks if user is already logged in
router.get('/', ensureAuthenticated, (req, res) => {
    res.render('sign/signin')
})

//Sign in action; handled by passport and session
router.post('/', ensureAuthenticated, passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    badRequestMessage: 'Debés ingresar tus credenciales.',
    failureFlash: true
}))

//exports the object
module.exports = router