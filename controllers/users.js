const JWT = require('jsonwebtoken')
const User = require('../model/user');
const {JWT_SECRET} = require('../configuration')
signToken = user => {
    return JWT.sign({
    iss: 'Lam', //issuer
    sub: user.id, //subject
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day
}, JWT_SECRET);
}

module.exports = {
    signup: async (req, res, next) => {
        const {email, password } = req.value.body;
        const newUser = new User({
            email,
            password
        })
        const foundUser = await User.findOne({email});
        if(foundUser) {
            console.log("foundUser ", foundUser)
           return res.status(403).json({error:'Email already taken'})
        }
        
        await newUser.save();
        console.log("user controller sign up called")
        //generate token
        const token = signToken(newUser)
        res.status(200).json({token})
    },
    signin: async (req, res, next) => {
        console.log("req user ", req.user)
        const token = signToken(req.user);
        res.status(200).json({token})
        console.log("user controller sign in called")
    },
    secret: async (req, res, next) => {
        console.log("user controller secret called");
        res.json({secret:'resource'})
    }
}