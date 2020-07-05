const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    contact: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true
    },

    startHour: {
        type: Number,
        required: true
    },

    endHour: {
        type: Number,
        required: true
    },

    service: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model('Appointment', appointmentSchema)