const express = require('express')
const router = express.Router()
const { forwardAuthenticated } = require('../config/auth')

//Home page
router.get('/', (req, res) => {
    //checks if the user is logged in to change the items from the menu
    checkAuthentication(req, res, 'index')
})

//Manicure page
router.get('/manicure', (req, res) => {
    checkAuthentication(req, res, 'pages/manicure')
})

//Makeup page
router.get('/makeup', (req, res) => {
    checkAuthentication(req, res, 'pages/makeup')
})

//Pedicure page
router.get('/pedicure', (req, res) => {
    checkAuthentication(req, res, 'pages/pedicure')
})

//Signs out the user from the current session
router.get('/signout', forwardAuthenticated, (req, res) => {
    //Logs it out
    req.logout()
    //Adds success message. It'll appear in the page to be redirected to
    req.flash('success_msg', 'Se ha cerrado sesión.')
    //Because the user logged out, we redirect to the login page
    res.redirect('/signin')
})

//Checks if the user is authenticated
function checkAuthentication(req, res, renderPage) {
    //if the user is authenticated, a param will be send to change the items from the menu
    if(req.isAuthenticated()) {
        res.render(renderPage, {
            authenticated: 'true'
        })
    } else {
        res.render(renderPage)
    }
}

//exports the router
module.exports = router