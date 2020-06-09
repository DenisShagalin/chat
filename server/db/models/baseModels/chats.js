module.exports = (queryInterface, Sequelize) => {
  const chats = queryInterface.define(
    "chats",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      creatorId: {
        type: Sequelize.INTEGER,
      },
    },
    {
      timestamps: false,
    }
  );
  return chats;
};
