const express = require('express');
const router = require('express-promise-router')();
const UserController = require('../controllers/users');
const passport = require('passport');
const passportConf = require('../passport');
const passportSignIn = passport.authenticate('local', { session: false });
const {validateBody, schemas} = require('../helpers/routeHelpers')

router.route('/signup')
    .post(validateBody(schemas.authSchema), UserController.signup);

router.route('/signin')
    .post(validateBody(schemas.authSchema), passportSignIn, UserController.signin);


router.route('/secret')
    .get(passport.authenticate('jwt', { session: false }), UserController.secret);

module.exports = router;
