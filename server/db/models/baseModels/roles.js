
module.exports = (queryInterface, Sequelize) => {
  const roles = queryInterface.define('roles', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING
    },
  }, {
    timestamps: false,
  });
  return roles;
};