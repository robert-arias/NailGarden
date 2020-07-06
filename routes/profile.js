const express = require('express')
const router = express.Router()
const User = require('../models/user')
const { forwardAuthenticated } = require('../config/auth')

//Profile page. Middleware to check for authentication (cannot be accessed if user isn't logged in; redirects to login page)
router.get('/', forwardAuthenticated, (req, res) => {
    //renders page with info
    res.render('profile/account', {
        name: req.user.name,
        email: req.user.email
    })
})

//Edit page. Middleware to check for authentication (cannot be accessed if user isn't logged in; redirects to login page)
router.get('/edit', forwardAuthenticated, (req, res) => {
    const tempUser = new User({
        name: req.user.name,
        email: req.user.email,
        password: ''
    })
    res.render('profile/edit', {
        user: tempUser
    })
})

//User send editted info
router.post('/', forwardAuthenticated, async (req, res) => {
    try {
        //creates user object
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.newPassword
        })
        //gets actual user from db
        const actualUser = await User.findById(req.user._id)
        //variable that storages the old password
        const oldPassword = req.body.oldPassword
        //variable for errors messages
        let errors = []

        //checks for empty fields
        if (!user.name || !user.email || !user.password || !oldPassword) {
            errors.push({ msg: 'Todos los campos deben estar llenos.' })
        }

        //validates email with regex
        if (!validateEmail(user.email)) {
            errors.push({ msg: 'El correo proporcionado no es válido.' })
        }

        //compares the actual password with the typed actual password
        if (!await actualUser.comparePasswords(oldPassword)) {
            errors.push({ msg: 'La contraseña actual no coincide.' })
        }

        //checks if new password is less than 8 characters
        if (user.password.length < 8) {
            errors.push({ msg: 'La nueva contraseña debe ser de al menos 8 caracteres.' })
        }

        //checks if there are errors
        if (errors.length > 0) {
            //renders same page, but sends the found errors (and the info that was typed)
            res.render('profile/edit', {
                user: user,
                oldPassword: oldPassword,
                errors: errors
            })
        } else {
            //saves data to the user for it to be updated
            actualUser.name = user.name
            actualUser.email= user.email
            actualUser.password = user.password
            //updates data to db
            await actualUser.save()
            //message of success
            req.flash('success_msg', 'Se han actualizado los datos correctamente.')
            //redirects to profile page with success message
            res.redirect('/profile')
        }
    } catch {
        //there have been errors
        errors.push({ msg: 'Ha ocurrido un error internamente. Intentalo más tarde.' })
        res.render('/profile', {
            user: user,
            oldPassword: req.body.oldPassword,
            errors: errors
        })
    }
})

//Delete user action. Middleware to check for authentication (cannot be deleted if user isn't logged in; redirects to login page)
router.get('/delete', forwardAuthenticated, async (req, res) => {
    let user
    try {
        //finds the logged user
        user = await User.findById(req.user._id)
        //deletes the user from db
        await user.remove()
        //logs out from passport
        req.logOut()
        //message of success
        req.flash('success_msg', 'Se ha eliminado tu cuenta.')
        //redirects to login page
        res.redirect('/signin')
    } catch {
        //there has been an error
        errors.push({ msg: 'Ha ocurrido un error internamente. Intentalo más tarde.' })
        res.render('/profile', {
            name: req.user.name,
            email: req.user.email,
            errors: errors
        })
    }
})

function validateEmail(email) {
    //Regex email validation, from https://emailregex.com/
    const emailRegexp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

    return emailRegexp.test(email)
}

//exports router
module.exports = router