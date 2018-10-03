const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const {ExtractJwt} = require('passport-jwt');
const {JWT_SECRET} = require('./configuration');
const User = require('./model/user');
const LocalStrategy = require('passport-local').Strategy;

//JSON web token strategy

passport.use(new JwtStrategy({
    jwtFromRequest:ExtractJwt.fromHeader('authorization'),
    secretOrKey: JWT_SECRET
}, async (payload, done) => {
    try {
        //find the user specified in token
        const user = await User.findById(payload.sub)
        //if user does not exist, handle it
        if(!user) {
            return done(null, false)
        }
        //otherwise, return user
        done(null,user)
    } catch(error) {
        done(error, false)
    }
}))

//local strategy
passport.use(new LocalStrategy({
    usernameField:'email'
}, async (email, password, done) => {
    try {
         //find user with given email
         const user = await User.findOne({
             email
         });
         //if not handle it
         if (!user) {
             return done(null, false);
         }
         //check if poassword correct
         const isMatch = await user.isValidPassword(password);
         //if not handle it
         if (!isMatch) {
             return done(null, false);
         }
         //otherwise return user
         done(null, user)

    } catch(error) {
        done(error,false);
    }
   
}))