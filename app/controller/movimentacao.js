const {
  tbl_produtos,
  tbl_movimentacoes,
  tbl_notificacoes
} = require('../models');
const util = require('./util');
const db = require('../models')

const criarMovimentacao = async (req, res, next) => {
  try {
    const produto = await tbl_produtos.findByPk(req.body.fk_movimentacao_produto)
    // tipo_operacao
    // 1 ---- Entrada
    // 2 ---- Saida
    let saldo = 0

    // Se for uma ENTRADA
    if (req.body.tipo_operacao == 1) {
      /*
        A quantidade informada não pode ser menor do que ZERO,
        caso queria diminuir a quantidade de produtos utilize a opção 'AJUSTE'
      */
      saldo = req.body.quantidade + produto.saldo
      if (req.body.quantidade <= 0) {
        throw `A Quantidade informada é menor ou igual a 0`
      }
      /*
        Saldo é a quantidade a ser adicionada ao produto mais
        o saldo atual do produto
      */
      else if (saldo > produto.quantidade_max) {
        throw `A quantidade informada ultrapassa a quantidade máxima (${produto.quantidade_max}) do produto ${produto.nome_produto}`
      }
    }
    // Se for uma SAIDA
    else if (req.body.tipo_operacao == 2) {
      /*
        Saldo recebe o saldo atual do protudo
        menos a quantidade informada na movimentação
      */
      saldo = produto.saldo - req.body.quantidade
      /*
        A quantidade informada não pode ser maior que o saldo
      */
      if (req.body.quantidade > produto.saldo) {
        throw `Saldo do produto ${produto.nome_produto} é insuficiente`
      }
      else if (saldo < produto.quantidade_min) {
        let notify = {
          fk_hierarquia: 1,
          descricao: `O saldo do produto ${produto.nome_produto} é de ${saldo} e está abaixo do nivel defenido como quantidade miníma, '${produto.quantidade_min}'`
        }
        tbl_notificacoes.create(notify)
      }
      else if (req.body.quantidade <= 0) {
        throw `A Quantidade informada é menor ou igual à 0`
      }
    }
    else {
      throw `Tipo de operação inválida`
    }

    // Atribuindo o saldo ao saldo do produto
    req.body.saldo_produto = saldo
    let dtmov = req.body.dt_movimentacao
    dtmov = dtmov.split('/')
    req.body['fk_meses'] = dtmov[1]

    return db.sequelize.transaction((t) => {
      return tbl_movimentacoes.create(req.body, {
        transaction: t
      })
        .then((movimentacao) => {
          let update_saldo = {
            saldo: movimentacao.saldo_produto
          }
          return tbl_produtos.update(update_saldo, {
            where: {
              id_produto: movimentacao.fk_movimentacao_produto
            }
          })
        })
    })
      .then(() => {
        let t_operacao = ''
        if (req.body.tipo_operacao == 1) {
          t_operacao = 'Sucesso ao realizar à entrada no estoque'
        } else if (req.body.tipo_operacao == 2) {
          t_operacao = 'Sucesso ao realizar à saída no estoque'
        }

        res.status(201).send(util.response("Movimentação", 201, t_operacao, "api/movimentacao", "POST"))
      })
      .catch((error) => {
        console.log(error)
        let msg_erro = []
        for (e in error.errors) {
          msg_erro.push(util.msg_error("Ocorreu um erro",
            error.errors[e].message,
            error.errors[e].value,
            error.errors[e].type,
            error.errors[e].validatorKey))
        }
        res.status(400).send(util.response("Erros", 400, `Encontramos alguns erros`, "api/movimentacao", "POST", msg_erro))
      })
  } catch (error) {
    let msg_erro = [
      {
        message: error,
        value: 'Error',
        type: 'Error',
        validatorKey: 'Error'
      }
    ]
    res.status(400).send(util.response("Erros", 400, `Encontramos alguns erros`, "api/movimentacao", "POST", msg_erro))
  }
}

const buscarMovimentacao = (req, res, next) => {
  tbl_movimentacoes.findAll()
    .then((mov) => {
      res.send(mov)
    })
}

module.exports = {
  criarMovimentacao,
  buscarMovimentacao
}