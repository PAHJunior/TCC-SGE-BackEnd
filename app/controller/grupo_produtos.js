const {
  tbl_grupo_produtos,
  tbl_categoria_produtos
} = require('../models');
const util = require('./util');
const db = require('../models')

const buscarGrupo_produtos = (req, res, next) => {
  tbl_grupo_produtos.findAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt',]
    },
    include: [{
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
      model: tbl_categoria_produtos,
      as: 'categoria'
    }]
  })
    .then((grupo_produtos) => {
      if ((grupo_produtos == null) || (grupo_produtos == undefined) || (grupo_produtos.length == 0)) {
        res.status(200)
          .send(util.response("Erro", 404, "Grupo não encontrada", "api/grupo_produtos", "GET", null))
      } else {
        res.status(200)
          .send(util.response("Buscar grupo", 200, grupo_produtos, "api/grupo_produtos", "GET", null))
      }
    }).catch((e) => {
      let error = console.error(e)
      res.status(200)
        .send(util.response("Error", 400, 'Ocorreu um error ao buscar o grupo', "api/grupo_produtos", "GET", error))
    })
}

const buscarUmGrupo_produto = (req, res, next) => {
  tbl_grupo_produtos.findAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    },
    include: [{
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
      model: tbl_categoria_produtos,
      as: 'categoria'
    }],
    where: {
      id_grupo_produto: req.params.id
    }
  })
    .then((grupo_produtos) => {
      if ((grupo_produtos == null) || (grupo_produtos == undefined) || (grupo_produtos.length == 0)) {
        res.status(200)
          .send(util.response("Erro", 404, "Grupo não encontrado", "api/grupo_produtos", "GET", null))
      } else {
        res.status(200)
          .send(util.response("Buscar grupo", 200, grupo_produtos, "api/grupo_produtos", "GET", null))
      }
    }).catch((e) => {
      let error = console.error(e)
      res.status(200)
        .send(util.response("Error", 400, 'Ocorreu um error ao buscar o grupo', "api/grupo_produtos", "GET", error))
    })
}

const criarGrupo_produto = (req, res, next) => {
  return db.sequelize.transaction((t) => {
    return tbl_grupo_produtos.create(req.body, {
      transaction: t
    })
  })
    .then((result) => {
      res.status(201).send(util.response("Cadastrar Grupos", 201, `Grupo ${result.nome} criado com sucesso`, "api/grupo_produtos", "POST"))
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
      res.status(200).send(util.response("Erros", 400, `Encontramos alguns erros`, "api/grupo_produtos", "POST", msg_erro))
    })
}

const modificarGrupo_produto = async (req, res, next) => {
  // Buscando o fornecedor pelo id
  const grupo = await tbl_grupo_produtos.findByPk(req.params.id)
  try {
    if (grupo !== null) {
      // adicionando a versão local ao corpo da requisição
      req.body['versaoLocal'] = grupo.versaoLocal
      // enviando a requisição de atualização
      tbl_grupo_produtos.update(req.body, {
        where: {
          id_grupo_produto: req.params.id
        }
      })
        .then((grupo) => {
          // se o retorno for 1, sucesso
          if (grupo == 1) {
            res.status(200).send(util.response("Sucesso", 200, "Alterado com sucesso", "api/grupo_produtos", "PATCH", null))
          } else {
            res.status(204).send(util.response("Sem alterações", 204, null, "api/grupo_produtos", "PATCH", null))
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
          res.status(200).send(util.response("Erros", 400, `Encontramos alguns erros`, "api/grupo_produtos", "PATCH", msg_erro))
        })
    } else {
      res.status(200).send(util.response("Erros", 404, `Grupo não encontrado`, "api/grupo_produtos", "PATCH", null))
    }
  } catch (error) {
    let msg_erro = []
    msg_erro.push(util.msg_error(
      "Ocorreu um erro",
      error,
      null,
      null,
      null))
    res.status(200).send(util.response("Erros", 400, `Encontramos alguns erros`, "api/grupo_produtos", "PATCH", msg_erro))
  }
}

const buscarGrupoByCategoria = (req, res, next) => {
  tbl_grupo_produtos.findAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    },
    include: [{
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
      model: tbl_categoria_produtos,
      as: 'categoria',
      where: {
        id_categoria_produto: req.params.id
      }
    }]
  })
    .then((grupo_produtos) => {
      if ((grupo_produtos == null) || (grupo_produtos == undefined) || (grupo_produtos.length == 0)) {
        res.status(200)
          .send(util.response("Erro", 404, "Grupo não encontrado", "api/grupo_produtos", "GET", null))
      } else {
        res.status(200)
          .send(util.response("Buscar grupo", 200, grupo_produtos, "api/grupo_produtos", "GET", null))
      }
    }).catch((e) => {
      let error = console.error(e)
      res.status(200)
        .send(util.response("Error", 400, 'Ocorreu um error ao buscar o grupo', "api/grupo_produtos", "GET", error))
    })
}

module.exports = {
  buscarGrupo_produtos,
  buscarUmGrupo_produto,
  criarGrupo_produto,
  modificarGrupo_produto,
  buscarGrupoByCategoria
}