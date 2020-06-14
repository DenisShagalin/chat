const express = require("express");
const router = express.Router();
const Joi = require("joi");
const db = require("../../db/models");

const schemas = require('../../schemas');

router.get("/", (req, res) => {
  const { error, value } = Joi.validate(req.query, schemas.searchChatSchema);
  if (error) {
    return res.status(400).send({ message: "Invalid search params" });
  }

  db.chats
    .findAll({
      where: {
        name: {
          [db.Op.iLike]: `%${value.search || ""}%`,
        },
      },
    })
    .then((result) => {
      res.send(result);
    })
    .catch(() => {
      res.status(404);
    });
});

router.post("/", (req, res) => {
  const { error, value } = Joi.validate(req.body, schemas.createNewChatSchema);
  if (error) {
    return res.status(400).send({ message: "Invalid params" });
  }

  db.chats.findOne({
    where: {
      name: value.name,
    }
  })
    .then((res) => {
      if (!res) {
        db.chats.create({
          name: value.name,
          creatorId: value.creator,
        });
      } else {
        res.status(400).send({ message: "This name already exist "})
      }
    })
    .catch(() => {
      res.status(400);
    });
});

module.exports = router;
