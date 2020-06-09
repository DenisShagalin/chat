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
      type: {
        type: Sequelize.ENUM('public','private'),
      },
      message: {
        type: Sequelize.STRING,
      },
      chatId: {
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      recipientId: {
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
