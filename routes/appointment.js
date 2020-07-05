const express = require('express')
const Appointment = require('../models/appointment')
const router = express.Router()
const moment = require('moment');

//Appointment page
router.get('/', (req, res) => {
    checkAuthentication(req, res, 'pages/appointment')
})

//User sends info from the form to set an appointment
router.post('/', async (req, res) => {
    //variable that will storage errors messages
    let errors = []
    try {
        //variables that will storage the info from the form
        const name = req.body.name
        const contact = req.body.contact
        const appointmentDate = moment(req.body.date).format('MMM Do YY')
        const startHour = req.body.hour != 'none' ? parseInt(req.body.hour) : 0
        const service = req.body.service != 'none' ? req.body.service : ''
        const description = req.body.description
        let endHour = 0

        //checks if some fields are empty
        if (!name || !contact || startHour == 0 || !service || !description) {
            errors.push({ msg: 'Por favor, rellene todos los campos.' })
        }

        //checks if date wasn't selected
        if (!moment(req.body.date).isValid()) {
            errors.push({ msg: 'Debe seleccionar una fecha.' })
        }

        //checks if the selected date is in the future
        if (appointmentDate < moment().format('MMM Do YY')) {
            errors.push({ msg: 'La cita no puede ser en el pasado.' })
        }

        //checks if there were errors
        if (errors.length > 0) {
            //renders same page, but sends the found error (and the info that was typed)
            res.render('pages/appointment', {
                authenticated: req.isAuthenticated() ? 'true' : undefined,
                name: name,
                email: contact,
                description: description,
                date: new Date(req.body.date),
                errors: errors
            })
        } else {
            //checks the type of service that was selected to calculate the end hour
            switch(service) {
                case 'Manicure':
                    endHour = startHour + 2
                    break

                case 'Pedicure':
                    endHour = startHour + 1
                    break

                case 'Makeup':
                    endHour = startHour + 1
            }

            //searches if there are appointmets at the given start and end hour
            const oldAppointment = await Appointment.findOne({
                date: appointmentDate,
                $and: [{
                    startHour: {
                        $lte: endHour
                    },
                    endHour: {
                        $gte: startHour
                    }
                }]
            })

            //if there is at least one appointment, the selected hour for the appointment cannot be done
            if(oldAppointment) {
                errors.push({ msg: 'La hora escogida para la cita no está disponible.' })
                //renders same page, but sends the found error (and the info that was typed)
                res.render('pages/appointment', {
                    authenticated: req.isAuthenticated() ? 'true' : undefined,
                    name: name,
                    email: contact,
                    date: appointmentDate,
                    description: description,
                    errors: errors
                })
            } else {
                //creates appointment object
                const appointment = new Appointment({
                    name: name,
                    contact: contact,
                    date: appointmentDate,
                    startHour: startHour,
                    endHour: endHour,
                    service: service,
                    description: description
                })

                //uploads info to db
                await appointment.save()
                res.render('pages/appointment', {
                    authenticated: req.isAuthenticated() ? 'true' : undefined,
                    success: 'Se ha reservado tu cita. Pronto te estaremos contactando.'
                })
            }
        }
    } catch (err) {
        //there has been an error
        errors.push({ msg: 'Ha ocurrido un error internamente. Intentalo más tarde.' })
        res.render('pages/appointment', {
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

module.exports = router