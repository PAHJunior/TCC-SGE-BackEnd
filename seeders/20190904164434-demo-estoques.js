'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tbl_estoques', [
      {
        ativo: true,
        nome_estoque: 'Estoque A',
        estoque_seguranca: 50,
        quantidade_total: 0
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.bulkDelete('tbl_estoques', null, {});
  }
};
