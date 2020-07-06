const express = require('express')
const router = express.Router()
const Contact = require('../models/contact')

//About us page
router.get('/', (req, res) => {
    checkAuthentication(req, res, 'pages/about-us')
})

//User sends info from contact form
router.post('/', async (req, res) => {
    try {
        //Creates contact
        const newContact = new Contact({
            name: req.body.name,
            contact: req.body.contact,
            subject: req.body.subject,
            message: req.body.message
        })

        //Variable to storage errors messages
        let errors = []

        //checks for empty fields
        if (!newContact.name || !newContact.contact || !newContact.subject || !newContact.message) {
            errors.push({ msg: 'Por favor, rellene todos los campos.' })
        }

        if (!validateEmail(newContact.email)) {
            if (newContact.contact.length < 8) {
                errors.push({ msg: 'El medio de contacto dado es invalido.' })
            }
        }

        //checks if there are errors
        if(errors.length > 0) {
            //renders same page, but sends the found error messages (and the info that was typed)
            res.render('pages/about-us', {
                authenticated: req.isAuthenticated() ? 'true' : undefined,
                name: newContact.name,
                contact: newContact.contact,
                message: newContact.message,
                subject: newContact.subject,
                errors: errors
            })
        } else {
            //upload data to db
            await newContact.save()
            //renders same page, but sends a success message
            res.render('pages/about-us', {
                authenticated: req.isAuthenticated() ? 'true' : undefined,
                success: 'Se ha enviado tu consulta. Pronto te estaremos contactando.'
            })
        }
    } catch {
        //there has been an error
        errors.push({ msg: 'Ha ocurrido un error internamente. Intentalo más tarde.' })
        res.render('pages/about-us', {
            user: user,
            errors: errors
        })
    }
})

//checks if the user is authenticated to change menu items and to auto-fill some fields
function checkAuthentication(req, res, renderPage) {
    if(req.isAuthenticated()) {
        res.render(renderPage, {
            authenticated: 'true',
            name: req.user.name,
            email: req.user.email
        })
    } else {
        res.render(renderPage)
    }
}

function validateEmail(email) {
    //Regex email validation, from https://emailregex.com/
    const emailRegexp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

    return emailRegexp.test(email)
}

module.exports = router