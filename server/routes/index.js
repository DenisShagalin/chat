const express = require('express');
const router = express.Router();
const passport = require('passport');
const { jwtToken } = require('../passport.js');

const signin = require('./signin');
const signup = require('./signup');
const chats = require('./chats');

passport.use(jwtToken);
router.use(passport.initialize());

router.use('/signin', signin);
router.use('/signup', signup);
router.use('/chats', /*passport.authenticate('jwt', { session: false })*/ chats),

// router.get('/', (req, res) => {
//     res.send({ ok: 'test'})
// });

module.exports = router;
