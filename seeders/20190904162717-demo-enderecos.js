'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tbl_enderecos',
      [{
          cep: '06764-250',
          logradouro: 'Rua Quintiliano José',
          complemento: ' ',
          bairro: 'Jardim Maria Rosa',
          numero: '125',
          cidade: 'Taboão da Serra',
          uf: 'SP'
        },
        {
          cep: '06810-036',
          logradouro: 'Viela Palmeira',
          complemento: ' ',
          bairro: 'Jardim Castilho',
          numero: '223',
          cidade: 'Embu das Artes',
          uf: 'SP'
        },
        {
          cep: '06824-168',
          logradouro: 'Viela Iporanga',
          complemento: ' ',
          bairro: 'Jardim da Luz',
          numero: '157',
          cidade: 'Embu das Artes',
          uf: 'SP'
        },
        {
          cep: '02055-001',
          logradouro: 'Rua José Bernardo Pinto',
          complemento: ' ',
          bairro: 'Vila Guilherme',
          numero: '157',
          cidade: 'São Paulo',
          uf: 'SP'
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tbl_enderecos', null, {});
  }
};