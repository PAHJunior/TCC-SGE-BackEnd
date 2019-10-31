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
      attributes: ['id_usuario', 'ativo', 'createdAt','updatedAt'],
      model: tbl_usuarios,
      as: 'usuarios'
    }]
  }).then((notificacao) => {
    return res.send(notificacao)
    // if ((notificacao == null) || (notificacao == undefined) || (notificacao.length == 0)) {
    //   error.push(util.msg_error("Erro", "Sem notificações", null, null, null, 404))
    // }
    // else if (error.length == 0) {
    //   res.status(200).send(util.response(
    //     "Erro",
    //     404,
    //     "Sem notificações",
    //     "api/notificacoes", "GET",
    //     error.push(util.msg_error("Erro", "Sem notificações", null, null, null, 404))
    //   ))
    // }
    // else {
    //   res.status(200).send(util.response("Buscar notificações", 200, notificacao, "api/notificacoes", "GET", null))
    // }
  }).catch((e) => {
    res.status(400)
      .send(util.response("Error", 400, 'Ocorreu um error ao buscar as notificações', "api/notificacoes", "GET", e))
  })
}

module.exports = {
  buscarNotificacaoByUser
}