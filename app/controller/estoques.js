const {
  tbl_estoques,
  tbl_empresas
} = require('../models');
const util = require('./util');
const db = require('../models')

const buscarEstoque = (req, res, next) => {
  tbl_estoques.findAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'fk_estoque_empresa']
    },
    include: [{
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'fk_empresa_configuracao', 'fk_empresa_endereco']
      },
      model: tbl_empresas,
      as: 'empresa'
    }]
  })
    .then((estoque) => {
      if ((estoque == null) || (estoque == undefined) || (estoque.length == 0)) {
        res.status(404)
          .send(util.response("Erro", 404, "Estoque não encontrado", "api/estoques", "GET", null))
      } else {
        res.status(200)
          .send(util.response("Buscar estoque", 200, estoque, "api/estoques", "GET", null))
      }
    }).catch((e) => {
      let error = console.error(e)
      res.status(400)
        .send(util.response("Error", 400, 'Ocorreu um error ao buscar os estoques', "api/empresas", "GET", error))
    })
}

const buscarUmEstoque = (req, res, next) => {
  tbl_estoques.findAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'fk_estoque_empresa']
    },
    include: [{
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'fk_empresa_configuracao', 'fk_empresa_endereco']
      },
      model: tbl_empresas,
      as: 'empresa'
    }],
    where: {
      id_estoque: req.params.id
    }
  })
    .then((estoque) => {
      if ((estoque == null) || (estoque == undefined) || (estoque.length == 0)) {
        res.status(404)
          .send(util.response("Erro", 404, "Estoque não encontrado", "api/estoques", "GET", null))
      } else {
        res.status(200)
          .send(util.response("Buscar estoque", 200, estoque, "api/estoques", "GET", null))
      }
    }).catch((e) => {
      let error = console.error(e)
      res.status(400)
        .send(util.response("Error", 400, 'Ocorreu um error ao buscar os estoques', "api/empresas", "GET", error))
    })
}

const cadastrarEstoque = (req, res, next) => {
  return db.sequelize.transaction((t) => {
    return tbl_estoques.create(req.body, {
      transaction: t
    })
  })
    .then((result) => {
      res.status(201).send(util.response("Cadastrar estoque", 201, `estoque ${result.nome_estoque} criado com sucesso`, "api/estoques", "POST"))
    })
    .catch((error) => {
      let msg_erro = []
      for (e in error.errors) {
        msg_erro.push(util.msg_error("Ocorreu um erro",
          error.errors[e].message,
          error.errors[e].value,
          error.errors[e].type,
          error.errors[e].validatorKey))
      }
      res.status(400).send(util.response("Erros", 400, `Encontramos alguns erros`, "api/estoques", "POST", msg_erro))
    })
}

const modificarEstoque = async (req, res, next) => {
  // Buscando o estoque pelo id
  const estoque = await tbl_estoques.findByPk(req.params.id)
  try {

    if (estoque !== null) {
      // adicionando a versão local ao corpo da requisição
      req.body['versaoLocal'] = estoque.versaoLocal
      // enviando a requisição de atualização
      tbl_estoques.update(req.body, {
        where: {
          id_estoque: req.params.id
        }
      })
        .then((estoque) => {
          // se o retorno for 1, sucesso
          if (estoque == 1) {
            res.status(200).send(util.response("Sucesso", 200, "Alterado com sucesso", "api/estoques", "PATCH", null))
          } else {
            res.status(204).send(util.response("Sem alterações", 204, null, "api/estoques", "PATCH", null))
          }
        })
        .catch((error) => {
          // variavel que contem um array de erros
          let msg_erro = []
          for (e in error.errors) {
            // adicionando o json ao array de erros
            msg_erro.push(util.msg_error("Ocorreu um erro",
              error.errors[e].message,
              error.errors[e].value,
              error.errors[e].type,
              error.errors[e].validatorKey))
          }
          res.status(400).send(util.response("Erros", 400, `Encontramos alguns erros`, "api/estoques", "PATCH", msg_erro))
        })
    } else {
      res.status(400).send(util.response("Erros", 404, `Usúario não foi encontrado`, "api/estoques", "PATCH", null))
    }
  } catch (error) {
    let msg_erro = []
    msg_erro.push(util.msg_error(
      "Ocorreu um erro",
      error,
      null,
      null,
      null))
    res.status(400).send(util.response("Erros", 400, `Encontramos alguns erros`, "api/estoques", "PATCH", msg_erro))
  }
}

module.exports = {
  buscarEstoque,
  buscarUmEstoque,
  cadastrarEstoque,
  modificarEstoque
}