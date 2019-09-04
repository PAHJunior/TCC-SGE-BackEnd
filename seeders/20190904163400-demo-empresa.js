'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tbl_empresas',
    [
      {
        razao_social: 'TCC',
        nome_fantasia: 'Truco Cerveja Churrasco',
        telefone: '4002-8922',
        cnpj: '52.937.951/0001-95',
        segmento: 'livraria',
        fk_empresa_configuracao: 'livraria',
        fk_empresa_endereco: 4
      },
      {
        name: 'John Doe',
        isBetaMember: false
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};