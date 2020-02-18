module.exports = (queryInterface, Sequelize) => {
  const users = queryInterface.define('users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    roleId: {
      type: Sequelize.STRING,
    },
  }, {
    timestamps: false,
  });
  return users;
};