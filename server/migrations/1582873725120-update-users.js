module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(
          "users",
          "email",
          {
            type: Sequelize.STRING
          },
          {
            transaction: t
          }
        )
      ]);
    });
  },
  down: queryInterface => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn("users", "email", { transaction: t }),
      ]);
    });
  }
};
