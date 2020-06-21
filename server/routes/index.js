const express = require("express");
const router = express.Router();
const passport = require("passport");
const { jwtToken } = require("../passport.js");

const signin = require("./signin");
const signup = require("./signup");

passport.use(jwtToken);
router.use(passport.initialize());

router.use("/signin", signin);
router.use("/signup", signup);

module.exports = router;
