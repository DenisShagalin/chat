module.exports = (queryInterface, Sequelize) => {
  const users = queryInterface.define('users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    nick: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    }
  }, {
    timestamps: false,
  });
  return users;
};