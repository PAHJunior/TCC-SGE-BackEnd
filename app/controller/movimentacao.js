const {
  tbl_estoques,
  tbl_movimentacoes
} = require('../models');
const util = require('./util');
const db = require('../models')

const criarMovimentacao = async (req, res, next) => {
  const produto = await tbl_produtos.findByPk(req.body.fk_movimentacao_produto)
  // tipo_operacao
  // 1 ---- Entrada
  // 2 ---- Saida
  // 3 ---- Ajuste
  if (req.body.tipo_operacao == 1) {
    /*
      Saldo previsto é a quantidade a ser adicionada ao produto mais
      o saldo atual do produto
    */
    let saldo = req.body.quantidade + produto.saldo
    if (saldo > produto.quantidade_max) {
      throw `A quantidade informada ultrapasou a quantidade máxima do produto ${produto.nome_produto}`
    }
  }
  else if (req.body.tipo_operacao == 2) {
    /*
      A quantidade informada não pode ser maior que o saldo
    */
    if (req.body.quantidade > produto.saldo) {
      throw `Saldo do produto ${produto.nome_produto} é insuficiente`
    }
  }

  return db.sequelize.transaction((t) => {
    return tbl_movimentacoes.create(req.body, {
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

module.exports = {
  cadastrarEstoque
}