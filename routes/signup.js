const express = require('express')
const User = require('../models/user')
const router = express.Router()
const { ensureAuthenticated } = require('../config/auth')

//Sign up form page
router.get('/', ensureAuthenticated, (req, res) => {
    res.render('sign/signup')
})

//User sends data to create an account
router.post('/', async (req, res) => {
    //creates user object
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    
    //storages the repeated password
    const rptPassword = req.body.rptPassword
    //variable for errors messages
    let errors = []

    //checks for empty fields
    if (!user.name || !user.email || !user.password || !rptPassword) {
        errors.push({ msg: 'Por favor, rellene todos los campos.' })
    }

    //checks if typed password and repeated password are the same
    if (user.password != rptPassword) {
        errors.push({ msg: 'Las contraseñas no coinciden.' })
    }

    //checks if the password is less than 8 characters
    if (user.password.length < 8) {
        errors.push({ msg: 'La contraseña debe ser de al menos 8 caracteres.' })
    }

    //checks if the user accepted the terms
    if (typeof req.body.terms == 'undefined') {
        errors.push({ msg: 'Debés aceptar los términos y condiciones.' })
    }

    //validates user with regex
    if (!validateEmail(user.email)) {
        errors.push({ msg: 'El correo proporcionado no es válido.' })
    }

    //check if there has been errors
    if (errors.length > 0) {
        //renders same page, but sends the found errors (and the info that was typed)
        res.render('sign/signup', {
            user: user,
            rptPassword: req.body.rptPassword,
            errors: errors
        })
    } else {
        try {
            //searches in db if there is an user with the typed email
            const userExists = await User.findOne({ email: user.email })
            //there's an user with the typed email
            if (userExists) {
                errors.push({ msg: 'El correo ingresado ya existe.' })
                //renders same page, but sends the found errors (and the info that was typed)
                res.render('sign/signup', {
                    user: user,
                    rptPassword: req.body.rptPassword,
                    errors: errors
                })
            } else {
                //email is new, the user is saved in db
                await user.save()
                req.flash('success_msg', 'Ahora estás registrado y podés iniciar sesión.')
                res.redirect('/signin')
            }
        } catch {
            //there's been an error
            errors.push({ msg: 'Ha ocurrido un error internamente. Intentalo más tarde.' })
            res.render('sign/signup', {
                user: user,
                rptPassword: req.body.rptPassword,
                errors: errors
            })
        }
    }
})

function validateEmail(email) {
    //Regex email validation, from https://emailregex.com/
    const emailRegexp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

    return emailRegexp.test(email)
}

//exports the router
module.exports = router