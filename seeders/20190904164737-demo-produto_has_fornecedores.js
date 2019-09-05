'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tbl_produto_has_tbl_fornecedores', [
      {
        tbl_produto_id_produto: 1,
        tbl_fornecedor_id_fornecedor: 1
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tbl_produto_has_tbl_fornecedores', null, {});
  }
};
