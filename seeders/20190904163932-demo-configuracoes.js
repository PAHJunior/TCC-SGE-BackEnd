'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tbl_configuracoes',
      [{
        db_username: 'root',
        db_pass: '',
        db_database: 'tcc_sge',
        db_host: '127.0.0.1',
        db_port: '3306',
        db_dialect: 'mysql'
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tbl_configuracoes', null, {});
  }
};