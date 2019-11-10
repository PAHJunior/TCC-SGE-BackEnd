const {
  tbl_tipo_documentos
} = require('../models');
const util = require('./util');
const db = require('../models')

const buscarTipo_documento = (req, res, next) => {
  tbl_tipo_documentos.findAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    }
  })
    .then((tipo_documento) => {
      if ((tipo_documento == null) || (tipo_documento == undefined) || (tipo_documento.length == 0)) {
        res.status(200)
          .send(util.response("Erro", 404, "Tipo de documento não encontrada", "api/tipo_documento", "GET", null))
      } else {
        res.status(200)
          .send(util.response("Buscar tipo de documento", 200, tipo_documento, "api/tipo_documento", "GET", null))
      }
    }).catch((e) => {
      let error = console.error(e)
      res.status(200)
        .send(util.response("Error", 400, 'Ocorreu um error ao buscar o tipo do documento', "api/tipo_documento", "GET", error))
    })
}

const buscarUmTipo_documento = (req, res, next) => {
  tbl_tipo_documentos.findAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    },
    where: {
      id_tipo_documento: req.params.id
    }
  })
    .then((tipo_documento) => {
      if ((tipo_documento == null) || (tipo_documento == undefined) || (tipo_documento.length == 0)) {
        res.status(200)
          .send(util.response("Erro", 404, "Tipo do documento não encontrado", "api/tipo_documento", "GET", null))
      } else {
        res.status(200)
          .send(util.response("Buscar grupo", 200, tipo_documento, "api/tipo_documento", "GET", null))
      }
    }).catch((e) => {
      let error = console.error(e)
      res.status(200)
        .send(util.response("Error", 400, 'Ocorreu um error ao buscar o tipo do documento', "api/tipo_documento", "GET", error))
    })
}

const criarTipo_documento = (req, res, next) => {
  return db.sequelize.transaction((t) => {
    return tbl_tipo_documentos.create(req.body, {
      transaction: t
    })
  })
    .then((result) => {
      res.status(201).send(util.response("Cadastrar tipo de documento", 201, `Tipo documento ${result.tipo_documento} cadastrado com sucesso`, "api/tipo_documento", "POST"))
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
      res.status(200).send(util.response("Erros", 400, `Encontramos alguns erros`, "api/tipo_documento", "POST", msg_erro))
    })
}

const modificarTipo_documento = async (req, res, next) => {
  // Buscando o fornecedor pelo id
  const tipo_documento = await tbl_tipo_documentos.findByPk(req.params.id)
  try {
    if (tipo_documento !== null) {
      // adicionando a versão local ao corpo da requisição
      req.body['versaoLocal'] = tipo_documento.versaoLocal
      // enviando a requisição de atualização
      tbl_tipo_documentos.update(req.body, {
        where: {
          id_tipo_documento: req.params.id
        }
      })
        .then((tipo_documento) => {
          // se o retorno for 1, sucesso
          if (tipo_documento == 1) {
            res.status(200).send(util.response("Sucesso", 200, "Alterado com sucesso", "api/tipo_documento", "PATCH", null))
          } else {
            res.status(204).send(util.response("Sem alterações", 204, null, "api/tipo_documento", "PATCH", null))
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
          res.status(200).send(util.response("Erros", 400, `Encontramos alguns erros`, "api/tipo_documento", "PATCH", msg_erro))
        })
    } else {
      res.status(200).send(util.response("Erros", 404, `Tipo de documento não encontrado`, "api/tipo_documento", "PATCH", null))
    }
  } catch (error) {
    let msg_erro = []
    msg_erro.push(util.msg_error(
      "Ocorreu um erro",
      error,
      null,
      null,
      null))
    res.status(200).send(util.response("Erros", 400, `Encontramos alguns erros`, "api/tipo_documento", "PATCH", msg_erro))
  }
}

module.exports = {
  buscarTipo_documento,
  buscarUmTipo_documento,
  criarTipo_documento,
  modificarTipo_documento
}