const express = require("express");
const router = express.Router();
const db = require("../../db/models");

router.get("/:userId", (req, res) => {
  db.users
    .findAll({
      attributes: ["nick", "id"],
      where: {
        id: {
          [db.Op.ne]: req.params.userId,
        },
      },
    })
    .then((result) => {
      res.send(result);
    })
    .catch(() => {
      res.status(400);
    });
});

module.exports = router;
