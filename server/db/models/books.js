const db = require('./index');

db.booksToUsers.belongsTo(db.books);

class Books {
  getAllBooks() {
    return db.books.findAll({
      attributes: ['id', 'name', 'description', 'price', 'amount', 'counter'],
      order: [
        ['name', 'ASC'],
      ],
    });
  };

  getBooksByUserId(userId) {
    return db.booksToUsers.findAll({
      attributes: ['id'],
      where: {
        userId: userId,
      },
      include: [
        {
          model: db.books,
          attributes: ['id', 'name', 'description', 'price', 'amount', 'counter'],
        },
      ],
    });
  };

  getTopBooks(limit) {
    return db.books.findAll({
      attributes: ['id', 'name', 'counter'],
      order: [
        ['counter', 'DESC'],
      ],
      limit: limit,
    });
  }
}

module.exports = new Books();
