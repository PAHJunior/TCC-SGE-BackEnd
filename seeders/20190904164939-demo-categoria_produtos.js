'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tbl_categoria_produtos', [
      {
        nome: 'Roupas',
        descricao: 'Todas as roupas',
        ativo: true
      },
      {
        nome: 'Refrigerante',
        descricao: 'Todas os refrigerantes',
        ativo: true
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.bulkDelete('tbl_categoria_produtos', null, {});
  }
};
