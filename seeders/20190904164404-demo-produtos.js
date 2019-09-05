'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tbl_produtos', [
      {
        codigo_produto: 0800,
        nome_produto: 'Coca-Cola 2 Litros',
        preco_unitario: 6.00,
        tipo_produto: 'Bidida',
        metodo_estocagem: 'FIFO',
        data_fabricacao: '2019-08-27',
        validade: '2020-08-27',
        saldo: 100,
        quantidade_min: 30,
        quantidade_max: 1000,
        ativo: true,
        fk_produto_unid_medida: 6,
        fk_produto_categoria: 2,
        fk_produto_grupo: 2
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tbl_produtos', null, {});
  }
};
