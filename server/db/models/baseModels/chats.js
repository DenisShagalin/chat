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
      type: {
        type: Sequelize.ENUM('public','private'),
      },
    },
    {
      timestamps: false,
    }
  );
  return chats;
};
