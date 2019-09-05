'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tbl_grupo_produtos', [
      {
        nome: 'Camisas',
        descricao: 'Todas as camisas',
        ativo: true,
        fk_categoria_produto: 1
      },
      {
        nome: 'Bebidas',
        descricao: 'Todas as bebidas',
        ativo: true,
        fk_categoria_produto: 2
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.bulkDelete('tbl_grupo_produtos', null, {});
  }
};
