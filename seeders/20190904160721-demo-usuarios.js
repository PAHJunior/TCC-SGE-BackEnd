'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tbl_usuarios',
    [
      {
        nome: 'Paulo Arthur Haller Junior',
        email: 'pahjunior@outlook.com',
        login: 'PAHJunior',
        senha: '123',
        fk_usuario_endereco: 1,
        fk_usuario_empresa: 2,
        fk_usuario_hierarquia: 1
      },
      {
        nome: 'Polyana Feitosa',
        email: 'polyana@outlook.com',
        login: 'Polyana',
        senha: '123',
        fk_usuario_endereco: 2,
        fk_usuario_empresa: 2,
        fk_usuario_hierarquia: 2
      },
      {
        nome: 'Natalia Almeida',
        email: 'natalia@outlook.com',
        login: 'Natalia',
        senha: '123',
        fk_usuario_endereco: 3,
        fk_usuario_empresa: 2,
        fk_usuario_hierarquia: 2
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tbl_usuarios', null, {});
  }
};
