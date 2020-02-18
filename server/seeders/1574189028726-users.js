'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('users', [
      {
        name: 'admin',
        password: 'admin',
        roleId: 1,
      },
    ], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('users', null, {})
  }
};
