const { tbl_empresas, tbl_enderecos, tbl_configuracoes } = require('../models');
const util = require('./util');
const db = require('../models')

const buscarEmpresa = (req, res, next) => {
  tbl_empresas.findAll({
    attributes: {
      exclude: ['fk_empresa_configuracao', 'fk_empresa_endereco']
    },
    include: [
      {
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'versaoLocal']
        },
        model: tbl_enderecos,
        as: 'endereco'
      },
      {
        model: tbl_configuracoes,
        as: 'configuracoes'
      },
    ]
  })
    .then((empresa) => {
      if ((empresa == null) || (empresa == undefined) || (empresa.length == 0)) {
        res.status(404)
          .send(util.response("Not Found", 404, empresa, "api/empresas", "GET", null))
      }
      else {
        res.status(200)
          .send(util.response("Buscar Empresa", 200, empresa, "api/empresas", "GET", null))
      }
    }).catch((e) => {
      let error = console.error(e)
      res.status(400)
        .send(util.response("Error", 400, 'Ocorreu um error ao buscar as empresas', "api/empresas", "GET", error))
    })
}

module.exports = {
  buscarEmpresa
}
