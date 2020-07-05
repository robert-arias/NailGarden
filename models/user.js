const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }
})

//this will be triggered before saving the user. it hashes the password
userSchema.pre('save', async function(next) {
    let user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) {
        return next();
    }
    try {
        user.password = await bcrypt.hash(user.password, 10)
        next()
    } catch(err) {
        return next(err)
    }
})

//method that compares passwords
userSchema.methods.comparePasswords = async function (passwrd) {
    try {
        return await bcrypt.compare(passwrd, this.password)
    } catch (err) {
        return err
    }
}

module.exports = mongoose.model('User', userSchema)