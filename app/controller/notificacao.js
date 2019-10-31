const {
  tbl_notificacoes,
  tbl_usuarios
} = require('../models');
const util = require('./util');
const db = require('../models')

const buscarNotificacaoByUser = (req, res, next) => {
  let error = []
  tbl_notificacoes.findAll({
    include: [{
      model: tbl_usuarios,
      as: 'usuarios'
    }]
  }).then((notificacao) => {
    if ((notificacao == null) || (notificacao == undefined) || (notificacao.length == 0)) {
      error.push(util.msg_error("Erro", "Sem notificações", null, null, null, 404))
    }
    else if (error.length > 0) {
      res.status(200).send(util.response(
        "Erro",
        404,
        "Sem notificações",
        "api/notificacoes", "GET",
        error.push(util.msg_error("Erro", "Sem notificações", null, null, null, 404))
      ))
    }
    else {
      res.status(200).send(util.response("Buscar notificações", 200, notificacao, "api/notificacoes", "GET", null))
    }
  }).catch((e) => {
    let error = console.error(e)
    res.status(400)
      .send(util.response("Error", 400, 'Ocorreu um error ao buscar as notificações', "api/notificacoes", "GET", error))
  })
}

module.exports = {
  buscarNotificacaoByUser
}