const {
  tbl_produtos,
  tbl_unid_medidas,
  tbl_categoria_produtos,
  tbl_grupo_produtos
} = require('../models');
const util = require('./util');
const db = require('../models')

const buscarProdutos = (req, res, next) => {
  tbl_produtos.findAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'ativo', 'versaoLocal', 'fk_produto_unid_medida', 'fk_produto_categoria', 'fk_produto_grupo']
    },
    include: [{
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'ativo', 'versaoLocal']
      },
      model: tbl_unid_medidas,
      as: 'unidade_medida'
    },
    {
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'ativo', 'versaoLocal']
      },
      model: tbl_categoria_produtos,
      as: 'categoria'
    },
    {
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'ativo', 'versaoLocal']
      },
      model: tbl_grupo_produtos,
      as: 'grupo'
    }]
  })
    .then((unid_medidas) => {
      if ((unid_medidas == null) || (unid_medidas == undefined) || (unid_medidas.length == 0)) {
        res.status(404)
          .send(util.response("Erro", 404, "Os produtos não foram encontrados", "api/produtos", "GET", null))
      } else {
        res.status(200)
          .send(util.response("Buscar produtos", 200, unid_medidas, "api/produtos", "GET", null))
      }
    }).catch((e) => {
      let msg_erro = []
      for (e in error.errors) {
        // adicionando o json ao array de erros
        msg_erro.push(util.msg_error("Ocorreu um erro",
          error.errors[e].message,
          error.errors[e].value,
          error.errors[e].type,
          error.errors[e].validatorKey))
      }
      res.status(400).send(util.response("Erros", 400, `Encontramos alguns erros`, "api/produtos", "GET", msg_erro))
    })
}

const buscarUmProdutos = (req, res, next) => {
  tbl_produtos.findAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'ativo', 'versaoLocal', 'fk_produto_unid_medida', 'fk_produto_categoria', 'fk_produto_grupo']
    },
    include: [{
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'ativo', 'versaoLocal']
      },
      model: tbl_unid_medidas,
      as: 'unidade_medida'
    },
    {
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'ativo', 'versaoLocal']
      },
      model: tbl_categoria_produtos,
      as: 'categoria'
    },
    {
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'ativo', 'versaoLocal']
      },
      model: tbl_grupo_produtos,
      as: 'grupo'
    }],
    where: {
      id_produto: req.params.id
    }
  })
    .then((unid_medidas) => {
      if ((unid_medidas == null) || (unid_medidas == undefined) || (unid_medidas.length == 0)) {
        res.status(404)
          .send(util.response("Erro", 404, "Produto não encontrado", "api/produtos", "GET", null))
      } else {
        res.status(200)
          .send(util.response("Buscar produto", 200, unid_medidas, "api/produtos", "GET", null))
      }
    }).catch((e) => {
      let msg_erro = []
      for (e in error.errors) {
        // adicionando o json ao array de erros
        msg_erro.push(util.msg_error("Ocorreu um erro",
          error.errors[e].message,
          error.errors[e].value,
          error.errors[e].type,
          error.errors[e].validatorKey))
      }
      res.status(400).send(util.response("Erros", 400, `Encontramos alguns erros`, "api/produtos", "GET", msg_erro))
    })
}

const criarProduto = (req, res, next) => {
  return db.sequelize.transaction((t) => {
    return tbl_produtos.create(req.body, {
      transaction: t
    })
  })
    .then((result) => {
      res.status(201).send(util.response("Cadastrar produto", 201, `Produto ${result.nome_produto} criado com sucesso`, "api/produtos", "POST"))
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
      res.status(400).send(util.response("Erros", 400, `Encontramos alguns erros`, "api/produtos", "POST", msg_erro))
    })
}

const modificarProduto = async (req, res, next) => {
  // Buscando o estoque pelo id
  const produto = await tbl_produtos.findByPk(req.params.id)

  try {

    if (produto !== null) {
      // adicionando a versão local ao corpo da requisição
      req.body['versaoLocal'] = produto.versaoLocal
      // enviando a requisição de atualização
      tbl_produtos.update(req.body, {
        where: {
          id_produto: req.params.id
        }
      })
        .then((produto) => {
          // se o retorno for 1, sucesso
          if (produto == 1) {
            res.status(200).send(util.response("Sucesso", 200, "Alterado com sucesso", "api/produtos", "PATCH", null))
          } else {
            res.status(204).send(util.response("Sem alterações", 204, null, "api/produtos", "PATCH", null))
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
          res.status(400).send(util.response("Erros", 400, `Encontramos alguns erros`, "api/produtos", "PATCH", msg_erro))
        })
    } else {
      res.status(404).send(util.response("Erros", 404, `Usúario não foi encontrado`, "api/produtos", "PATCH", null))
    }
  } catch (error) {
    let msg_erro = []
    msg_erro.push(util.msg_error(
      "Ocorreu um erro",
      error,
      null,
      null,
      null))
    res.status(400).send(util.response("Erros", 400, `Encontramos alguns erros`, "api/produtos", "PATCH", msg_erro))
  }
}

module.exports = {
  buscarProdutos,
  buscarUmProdutos,
  criarProduto,
  modificarProduto
}