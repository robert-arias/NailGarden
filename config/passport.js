const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

//verificates authentication
function initialize(passport) {
    //params come from the form
    const authenticateUser = async (email, password, done) => {
        try {
            //checks if the user exists
            const user = await User.findOne({
                email: email
            })
            
            //there isn't an user with that email
            if (!user) {
                return done(null, false, { message: 'El correo ingresado no está registrado.' })
            } else {
                //there is an user, but we need to check if the password matches.
                if (await user.comparePasswords(password)) {
                    return done(null, user)
                } else {
                    return done(null, false, { message: 'Contraseña incorrecta.' })
                }
            }
        } catch(e) {
            return done(e)
        }
    }

  //makes the local strategy to make authentication and sets that the usernamefield is the email from the form
  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  //serializes the user in the session cookie
  passport.serializeUser((user, done) => done(null, user.id))
  //deserializes the user from the session cookie
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user)
    })
  })
}

module.exports = initialize