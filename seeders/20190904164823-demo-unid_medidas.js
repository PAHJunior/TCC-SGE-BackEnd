'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tbl_unid_medidas', [
      {
        nome: 'm',
        descricao: 'Metros',
        ativo: true
      },
      {
        nome: 'kg',
        descricao: 'Quilograma',
        ativo: true
      },
      {
        nome: 'mol',
        descricao: 'Mol',
        ativo: true
      },
      {
        nome: 'm²',
        descricao: 'Metro quadrado',
        ativo: true
      },
      {
        nome: 'm³',
        descricao: 'Metro cúbico',
        ativo: true
      },
      {
        nome: 'L',
        descricao: 'Litros',
        ativo: true
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.bulkDelete('tbl_unid_medidas', null, {});
  }
};
