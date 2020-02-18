const db = require('./index');

db.users.belongsTo(db.roles, { foreignKey: 'roleId' });
db.users.hasMany(db.booksToUsers, { foreignKey: 'userId' });
db.booksToUsers.belongsTo(db.books, { foreignKey: 'bookId' });

class Users {
  getAllUsers() {
    return db.users.findAll({
      attributes: ['id', 'name'],
      order: ['name'],
      include: [
        {
          model: db.roles,
          order: ['name'],
        },
        {
          model: db.booksToUsers,
          attributes: ['id'],
          include:[
            {
              model: db.books,
              attributes: ['name'],
            },
          ],
        },
      ],
    });
  }
}

module.exports = new Users();
