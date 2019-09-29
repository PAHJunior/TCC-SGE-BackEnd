const {
  tbl_categoria_produtos
} = require('../models');
const util = require('./util');
const db = require('../models')

const buscarCategoria_produtos = (req, res, next) => {
  tbl_categoria_produtos.findAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    }
  })
    .then((categoria_produtos) => {
      if ((categoria_produtos == null) || (categoria_produtos == undefined) || (categoria_produtos.length == 0)) {
        res.status(404)
          .send(util.response("Erro", 404, "Categoria produto não encontrada", "api/categoria_produtos", "GET", null))
      } else {
        res.status(200)
          .send(util.response("Buscar categoria produto", 200, categoria_produtos, "api/categoria_produtos", "GET", null))
      }
    }).catch((e) => {
      let error = console.error(e)
      res.status(400)
        .send(util.response("Error", 400, 'Ocorreu um error ao buscar a categoria do produto', "api/categoria_produtos", "GET", error))
    })
}

const buscarUmaCategoria_produto = (req, res, next) => {
  tbl_categoria_produtos.findAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    },
    where: {
      id_categoria_produto: req.params.id
    }
  })
    .then((categoria_produtos) => {
      if ((categoria_produtos == null) || (categoria_produtos == undefined) || (categoria_produtos.length == 0)) {
        res.status(404)
          .send(util.response("Erro", 404, "Categoria produto não encontrada", "api/categoria_produtos", "GET", null))
      } else {
        res.status(200)
          .send(util.response("Buscar categoria produto", 200, categoria_produtos, "api/categoria_produtos", "GET", null))
      }
    }).catch((e) => {
      let error = console.error(e)
      res.status(400)
        .send(util.response("Error", 400, 'Ocorreu um error ao a categoria do produto', "api/categoria_produtos", "GET", error))
    })
}

const criarCategoria_produto = (req, res, next) => {

  return db.sequelize.transaction((t) => {
    return tbl_categoria_produtos.create(req.body, {
      transaction: t
    })
  })
    .then((result) => {
      res.status(201).send(util.response("Cadastrar categoria", 201, `Categoria ${result.nome} cadastrada com sucesso`, "api/categoria_produtos", "POST"))
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
      res.status(400).send(util.response("Erros", 400, `Encontramos alguns erros`, "api/categoria_produtos", "POST", msg_erro))
    })
}

const modificarCategoria_produto = async (req, res, next) => {
  // Buscando o usuario pelo id e guardando dentro de user
  const categoria = await tbl_categoria_produtos.findByPk(req.params.id)
  try {
    if (categoria !== null) {
      // adicionando a versão local ao corpo da requisição
      req.body['versaoLocal'] = categoria.versaoLocal
      // enviando a requisição de atualização
      tbl_categoria_produtos.update(req.body, {
        where: {
          id_categoria_produto: req.params.id
        }
      })
        .then((empresa) => {
          // se o retorno for 1, sucesso
          if (empresa == 1) {
            res.status(200).send(util.response("Sucesso", 200, "Alterado com sucesso", "api/categoria_produtos", "PATCH", null))
          } else {
            res.status(204).send(util.response("Sem alterações", 204, null, "api/categoria_produtos", "PATCH", null))
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
          res.status(400).send(util.response("Erros", 400, `Encontramos alguns erros`, "api/categoria_produtos", "PATCH", msg_erro))
        })
    } else {
      res.status(400).send(util.response("Erros", 404, `Usúario não foi encontrado`, "api/empresas", "PATCH", null))
    }
  } catch (error) {
    let msg_erro = []
    console.log(error)
    msg_erro.push(util.msg_error(
      "Ocorreu um erro",
      error,
      null,
      null,
      null))
    res.status(400).send(util.response("Erros", 400, `Encontramos alguns erros`, "api/empresas", "PATCH", msg_erro))
  }
}

module.exports = {
  buscarCategoria_produtos,
  buscarUmaCategoria_produto,
  criarCategoria_produto,
  modificarCategoria_produto
}