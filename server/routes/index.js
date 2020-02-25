const express = require('express');
const router = express.Router();

const passport = require('passport');
const { jwtToken } = require('../passport.js');

const login = require('./login');

passport.use(jwtToken);
router.use(passport.initialize());


// router.use('/login', passport.authenticate('jwt', { session: false }), login);
router.use('/login', login);

module.exports = router;
