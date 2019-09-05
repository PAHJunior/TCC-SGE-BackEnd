'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tbl_hierarquias', [
      {
        nome: 'Administrador',
        ativo: true
      },
      {
        nome: 'Gerente',
        ativo: true
      },
      {
        nome: 'Funcionario',
        ativo: true
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.bulkDelete('tbl_hierarquias', null, {});
  }
};
