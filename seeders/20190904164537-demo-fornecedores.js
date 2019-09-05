'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tbl_fornecedores', [
      {
        ativo: true,
        nome_fornecedor: 'Coca-Cola',
        cnpj: '48.297.882/0001-25',
        representante: 'Irineu',
        telefone_fornecedor: '1140028922',
        telefone_respresentante: '1140028922',
        email_representante: 'pahjunior@outlook.com',
        fk_fornecedor_endereco: 4
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.bulkDelete('tbl_fornecedores', null, {});
  }
};
