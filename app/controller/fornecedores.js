const { tbl_fornecedores, tbl_representantes, tbl_enderecos } = require('../models');
const util = require('./util');
const bcrypt = require('bcrypt');
const db = require('../models')

const buscarEstoque = (req, res, next) => {
  tbl_fornecedores.findAll({
    attributes: {
      exclude: ['fk_fornecedor_endereco', 'fk_fornecedor_representante']
    },
    include: [
      {
        attributes: {
          exclude: ['ativo', 'versaoLocal', 'createdAt', 'updatedAt']
        },
        model: tbl_representantes,
        as: 'representante'
      },
      {
        attributes: {
          exclude: ['versaoLocal', 'createdAt', 'updatedAt']
        },
        model: tbl_enderecos,
        as: 'endereco'
      },
    ]
  })
    .then((fornecedor) => {
      if ((fornecedor == null) || (fornecedor == undefined) || (fornecedor.length == 0)) {
        res.status(404)
          .send(util.response("Not Found", 404, fornecedor, "api/fornecedores", "GET", null))
      }
      else {
        res.status(200)
          .send(util.response("Buscar Fornecedores", 200, fornecedor, "api/fornecedores", "GET", null))
      }
    }).catch((e) => {
      let error = console.error(e)
      res.status(400)
        .send(util.response("Error", 400, 'Ocorreu um error ao buscar os fornecedores', "api/fornecedores", "GET", error))
    })
}

module.exports = {
  buscarEstoque
}
