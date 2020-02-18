const express = require('express');
const router = express.Router();
const db = require('../db/models/index');

router.post('/', (req, res) => {
  const name = req.body.Name;
  const password = req.body.Password;
  db.users.findOne({
    where: {
      name: name,
    },
  })
    .then((result) => {
      if (!result) {
        db.users.create({
          name: name,
          password: password,
          roleId: 2,
        }).then(() => {
          res.sendStatus(200);
        })
        .catch(() => {
          res.status(404).send({ message : 'Something went wrong' });
        })
      } else {
        throw new Error();
      }
    })
    .catch(() => {
      res.status(404).send({ message : 'User already exist' });
    });
});

module.exports = router;