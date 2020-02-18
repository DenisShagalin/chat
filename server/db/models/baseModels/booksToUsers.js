
module.exports = (queryInterface, Sequelize) => {
    const booksToUsers = queryInterface.define('booksToUsers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      bookId: {
        type: Sequelize.INTEGER,
      },
      date: {
        type: Sequelize.DATE,
      },
    }, {
      timestamps: false,
    });
    return booksToUsers;
  };