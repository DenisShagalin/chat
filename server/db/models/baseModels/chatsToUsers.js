module.exports = (queryInterface, Sequelize) => {
  const booksToUsers = queryInterface.define(
    "chatsToUsers",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      chatId: {
        type: Sequelize.INTEGER,
      },
    },
    {
      timestamps: false,
    }
  );
  return booksToUsers;
};
