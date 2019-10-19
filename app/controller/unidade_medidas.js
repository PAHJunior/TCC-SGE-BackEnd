const {
  tbl_unid_medidas
} = require('../models');
const util = require('./util');
const db = require('../models')

const buscarUnid_medida = (req, res, next) => {
  tbl_unid_medidas.findAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    }
  })
    .then((unid_medidas) => {
      if ((unid_medidas == null) || (unid_medidas == undefined) || (unid_medidas.length == 0)) {
        res.status(200)
          .send(util.response("Erro", 404, "Unidade de medida não encontrada", "api/unidade_medidas", "GET", null))
      } else {
        res.status(200)
          .send(util.response("Buscar grupo", 200, unid_medidas, "api/unidade_medidas", "GET", null))
      }
    }).catch((e) => {
      let error = console.error(e)
      res.status(200)
        .send(util.response("Error", 400, 'Ocorreu um error ao buscar o grupo', "api/unidade_medidas", "GET", error))
    })
}

const buscarUmUnid_medida = (req, res, next) => {
  tbl_unid_medidas.findAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    },
    where: {
      id_unid_medida: req.params.id
    }
  })
    .then((unid_medidas) => {
      if ((unid_medidas == null) || (unid_medidas == undefined) || (unid_medidas.length == 0)) {
        res.status(200)
          .send(util.response("Erro", 404, "Unidade de medida não encontrada", "api/unidade_medidas", "GET", null))
      } else {
        res.status(200)
          .send(util.response("Buscar grupo", 200, unid_medidas, "api/unidade_medidas", "GET", null))
      }
    }).catch((e) => {
      let error = console.error(e)
      res.status(200)
        .send(util.response("Error", 400, 'Ocorreu um error ao buscar o grupo', "api/unidade_medidas", "GET", error))
    })
}

const criarUnid_medida = (req, res, next) => {
  return db.sequelize.transaction((t) => {
    return tbl_unid_medidas.create(req.body, {
      transaction: t
    })
  })
    .then((result) => {
      res.status(201).send(util.response("Cadastrar unidade de medida", 201, `Unidade de medida ${result.nome} criada com sucesso`, "api/unidade_medidas", "POST"))
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
      res.status(200).send(util.response("Erros", 400, `Encontramos alguns erros`, "api/unidade_medidas", "POST", msg_erro))
    })
}

const modificarUnid_medida = async (req, res, next) => {
  // Buscando o fornecedor pelo id
  const medida = await tbl_unid_medidas.findByPk(req.params.id)
  try {
    if (medida !== null) {
      // adicionando a versão local ao corpo da requisição
      req.body['versaoLocal'] = medida.versaoLocal
      // enviando a requisição de atualização
      tbl_unid_medidas.update(req.body, {
        where: {
          id_unid_medida: req.params.id
        }
      })
        .then((unidade_medidas) => {
          // se o retorno for 1, sucesso
          if (unidade_medidas == 1) {
            res.status(200).send(util.response("Sucesso", 200, "Alterado com sucesso", "api/unidade_medidas", "PATCH", null))
          } else {
            res.status(204).send(util.response("Sem alterações", 204, null, "api/unidade_medidas", "PATCH", null))
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
          res.status(200).send(util.response("Erros", 400, `Encontramos alguns erros`, "api/unidade_medidas", "PATCH", msg_erro))
        })
    } else {
      res.status(200).send(util.response("Erros", 404, `Unidade de medida não encontrada`, "api/unidade_medidas", "PATCH", null))
    }
  } catch (error) {
    let msg_erro = []
    msg_erro.push(util.msg_error(
      "Ocorreu um erro",
      error,
      null,
      null,
      null))
    res.status(200).send(util.response("Erros", 400, `Encontramos alguns erros`, "api/unidade_medidas", "PATCH", msg_erro))
  }
}

module.exports = {
  buscarUnid_medida,
  buscarUmUnid_medida,
  criarUnid_medida,
  modificarUnid_medida
}