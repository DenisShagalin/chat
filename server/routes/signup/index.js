const express = require('express');
const router = express.Router();
const Joi = require('joi');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const db = require('../../db/models');
const schemas = require('../../schemas');
const config = require('../config.json');

router.post('/', (req, res) => {
  const { error, value } = Joi.validate(req.body, schemas.signupSchema);
  if (error) {
    return res.status(404).send({ message: 'Invalid name or password' });
  }

  db.users
    .findOne({
      where: {
        [db.Op.or]: [
          {
            nick: value.nick
          },
          {
            email: value.email
          }
        ]
      }
    })
    .then((user) => {
      if (user) {
        throw new Error();
      }
      db.users
        .create({
          nick: value.nick,
          email: value.email,
          name: value.name,
          password: md5(value.password)
        })
        .then((result) => {
          const token = jwt.sign(result.dataValues, config.secret, {
            expiresIn: config.tokenLife
          });
          res.send({ token, user: result.dataValues });
        })
        .catch(() => {
          res.status(404).send({ message: 'Invalid nickname or email' });
        });
    })
    .catch(() => {
      res.status(404).send({ message: 'Invalid nickname or email' });
    });
});

module.exports = router;
