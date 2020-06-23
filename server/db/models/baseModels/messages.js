module.exports = (queryInterface, Sequelize) => {
  const messages = queryInterface.define(
    "messages",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      message: {
        type: Sequelize.TEXT,
      },
      chatId: {
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
    },
    {
      timestamps: false,
    }
  );
  return messages;
};
