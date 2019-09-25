const {
  tbl_hierarquias
} = require('../models');
const util = require('./util');
const db = require('../models')

// Bscar todas as hierarquias
const buscarHierarquia = (req, res, next) => {
  tbl_hierarquias.findAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    }
  })
    .then((hierarquia) => {
      if ((hierarquia == null) || (hierarquia == undefined) || (hierarquia.length == 0)) {
        res.status(404)
          .send(util.response("Erro", 404, "Estoque não encontrado", "api/hierarquias", "GET", null))
      } else {
        res.status(200)
          .send(util.response("Buscar hierarquia", 200, hierarquia, "api/hierarquias", "GET", null))
      }
    }).catch((e) => {
      let error = console.error(e)
      res.status(400)
        .send(util.response("Error", 400, 'Ocorreu um error ao buscar as hierarquias', "api/hierarquias", "GET", error))
    })
}

// Buscar uma única hierarquia pelo by
const buscarUmaHierarquia = (req, res, next) => {
  tbl_hierarquias.findAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    },
    where: {
      id_hierarquia: req.params.id
    }
  })
    .then((hierarquia) => {
      if ((hierarquia == null) || (hierarquia == undefined) || (hierarquia.length == 0)) {
        res.status(404)
          .send(util.response("Erro", 404, "Estoque não encontrado", "api/hierarquias", "GET", null))
      } else {
        res.status(200)
          .send(util.response("Buscar hierarquia", 200, hierarquia, "api/hierarquias", "GET", null))
      }
    }).catch((e) => {
      let error = console.error(e)
      res.status(400)
        .send(util.response("Error", 400, 'Ocorreu um error ao buscar as hierarquias', "api/hierarquias", "GET", error))
    })
}

// Cadastrar hierarquia
const cadastrarHierarquia = (req, res, next) => {
  return db.sequelize.transaction((t) => {
    return tbl_hierarquias.create(req.body, {
      transaction: t
    })
  })
    .then((result) => {
      res.status(201).send(util.response("Cadastrar hierarquia", 201, `hierarquia ${result.nome} criada com sucesso`, "api/hierarquias", "POST"))
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
      res.status(400).send(util.response("Erros", 400, `Encontramos alguns erros`, "api/hierarquias", "POST", msg_erro))
    })
}

// Modificar hierarquia
const modificarHierarquia = async (req, res, next) => {
  // Buscando a hierarquia  pelo id
  const hierarquia = await tbl_hierarquias.findByPk(req.params.id)
  try {

    if (hierarquia !== null) {
      if (hierarquia.nome == req.body.nome) {
        throw `O nome da hierarquia ${req.body.nome} é o mesmo cadastrado anteriormente`
      }
      // adicionando a versão local ao corpo da requisição
      req.body['versaoLocal'] = hierarquia.versaoLocal
      // enviando a requisição de atualização
      tbl_hierarquias.update(req.body, {
        where: {
          id_hierarquia: req.params.id
        }
      })
        .then((hierarquia) => {
          // se o retorno for 1, sucesso
          if (hierarquia == 1) {
            res.status(200).send(util.response("Sucesso", 200, "Alterado com sucesso", "api/hierarquias", "PATCH", null))
          } else {
            res.status(204).send(util.response("Sem alterações", 204, null, "api/hierarquias", "PATCH", null))
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
          res.status(400).send(util.response("Erros", 400, `Encontramos alguns erros`, "api/hierarquias", "PATCH", msg_erro))
        })
    } else {
      res.status(400).send(util.response("Erros", 404, `Hierarquia não foi encontrado`, "api/hierarquias", "PATCH", null))
    }
  } catch (error) {
    let msg_erro = []
    msg_erro.push(util.msg_error(
      "Ocorreu um erro",
      error,
      null,
      null,
      null))
    res.status(400).send(util.response("Erros", 400, `Encontramos alguns erros`, "api/Hierarquia", "PATCH", msg_erro))
  }
}

module.exports = {
  buscarHierarquia,
  buscarUmaHierarquia,
  cadastrarHierarquia,
  modificarHierarquia
}