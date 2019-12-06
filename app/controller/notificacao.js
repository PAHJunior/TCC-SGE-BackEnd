const {
  tbl_notificacoes,
  tbl_usuarios,
  tbl_hierarquias
} = require('../models');

const util = require('./util');
const db = require('../models')
const Op = db.Sequelize.Op;

const buscarNotificacao = (req, res, next) => {
  let error = []
  tbl_notificacoes.findAll({
    order: [
      ['createdAt', 'DESC'],
    ],
    where: {
      [Op.or] : {
        fk_hierarquia: req.params.hierarquia,
        fk_usuario: req.params.user,
      }
    }
  })
  
    .then((notificacao) => {
      if (notificacao.length == 0) {
        res.status(200).send(util.response(
          "Erro",
          404,
          "Sem notificações",
          "api/notificacoes",
          "GET",
          error.push(util.msg_error("Erro", "Sem notificações", null, null, null, 404))
        ))
      }
      else {
        res.status(200).send(util.response("Buscar notificações", 200, notificacao, "api/notificacoes", "GET", null))
      }
    }).catch((e) => {
      res.status(400)
        .send(util.response("Error", 400, 'Ocorreu um error ao buscar as notificações', "api/notificacoes", "GET", e))
    })
}

const testequery = (req, res, next) => {
  db.sequelize.query("select * from tbl_meses", { type: db.sequelize.QueryTypes.SELECT})
    .then((meses) => {
      res.send(meses)
    })
}
module.exports = {
  buscarNotificacao,
  testequery
}