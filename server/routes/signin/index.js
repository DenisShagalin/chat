const express = require('express');
const router = express.Router();
const Joi = require('joi');
const db = require('../../db/models');
const jwt = require('jsonwebtoken');
const config = require('../config.json');

const schemas = require('../../schemas');

router.post('/', (req, res) => {
  const { error, value } = Joi.validate(req.body, schemas.signinSchema);
  if (error) {
    return res.status(404).send({ message : 'Invalid name or password' });
  }

  db.users.findOne({
    where: {
      nick: value.nick,
      password: value.password,
    },
  })
    .then((result) => {
      if (!result) {
        throw new Error();
      }
      const token = jwt.sign(result.dataValues, config.secret, { expiresIn: config.tokenLife });
      res.send({ token });
    })
    .catch(() => {
      res.status(404).send({ message : 'Invalid name or password' });
    })
});

module.exports = router;