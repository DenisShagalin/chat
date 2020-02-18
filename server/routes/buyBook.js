const express = require('express');
const router = express.Router();
const db = require('../db/models/index');

const books = require('../db/models/books');

router.post('/buy', (req, res) => {
  const bookId = req.body.book.id;
  const counter = req.body.book.counter;
  const amount = req.body.book.amount;
  const userId = req.body.userId;

  db.booksToUsers.create({
    bookId: bookId,
    userId: userId,
    date: new Date(),
  })
    .then(() => {
      db.books.update({
        counter: counter + 1,
        amount: amount - 1,
      }, {
        where: {
          id: bookId,
        },
      })
        .then(() => {
          books.getAllBooks()
            .then((result) => {
              res.send(result);
            })
            .catch(() => {
              res.status(404).send({ message: 'Something went wrong' });
            });
        })
        .catch(() => {
          res.status(404).send({ message: 'Something went wrong' });
        });
    })
    .catch(() => {
      res.status(404).send({ message: 'Something went wrong' });
    });
});

router.put('/return/:id', (req, res) => {
  const { id } = req.params;
  const bookId = req.body.bookId;
  const userId = req.body.userId;
  const amount = req.body.amount;
  const payment = req.body.price;
  db.booksToUsers.destroy({
    where: {
      id: id,
    },
  })
    .then(() => {
      db.books.update({
        amount: amount + 1,
      }, {
        where: {
          id: bookId,
        },
      })
        .then(() => {
          db.payments.create({
            userId: userId,
            bookId: bookId,
            payment: payment,
            date: new Date(),
          })
            .then(() => {
              res.sendStatus(200)
            })
            .catch(() => {
              res.status(404).send({ message: 'Something went wrong' });
            });
        })
        .catch(() => {
          res.status(404).send({ message: 'Something went wrong' });
        });
    })
    .catch(() => {
      res.status(404).send({ message: 'Something went wrong' });
    });
});

module.exports = router;
