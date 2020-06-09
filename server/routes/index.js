const express = require('express');
const router = express.Router();
const passport = require('passport');
const { jwtToken } = require('../passport.js');

const signin = require('./signin');
const signup = require('./signup');

passport.use(jwtToken);
router.use(passport.initialize());

// router.use('/login', passport.authenticate('jwt', { session: false }), login);
router.use('/signin', signin);
router.use('/signup', signup);

router.get('/', (req, res) => {
    res.send({ ok: 'test'})
});

module.exports = router;
