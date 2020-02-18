'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('roles', [
      {
        name: 'Admin',
      },
      {
        name: 'User',
      },
    ], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('roles', null, {})
  }
};
