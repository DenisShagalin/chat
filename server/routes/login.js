const express = require('express');
const router = express.Router();
const db = require('../db/models/index');
const jwt = require('jsonwebtoken');
const config = require('./config.json');

db.users.belongsTo(db.roles, { foreignKey: 'roleId' })

router.post('/', (req, res) => {
  const name = req.body.Name;
  const password = req.body.Password;
  db.users.findOne({
    attributes: ['id','name'],
    where: {
      name: name,
      password: password,
    },
    include: [{
      model: db.roles,
    }]
  })
    .then((result) => {
      if (!result) {
        throw new Error();
      }
      const token = jwt.sign(
          { role: result.dataValues.role.name },
          config.secret,
          { expiresIn: config.tokenLife }
        );
      const permissions = {
        user: result,
        token,
      }
      res.send(permissions);
    })
    .catch(() => {
      res.status(404).send({ message : 'Invalid name or password' });
    })
});

module.exports = router;