const { tbl_usuarios, tbl_hierarquias } = require('../models');
const util = require('./util');
const bcrypt = require('bcrypt');
const db = require('../models')

// Buscar todos os usuarios
const getAllUsuarios = (req, res, next) => {

  // db.sequelize.query(
  //   `SELECT * FROM vw_get_all_users;`,
  //   { type: db.sequelize.QueryTypes.SELECT})
  //   .then((ususarios) => {

  //     if (!(ususarios ==  null) || (ususarios == undefined) || (ususarios.length > 0)){
  //       res.status(200).send(util.response("Usuarios", 200, ususarios, "api/usuarios", null))
  //     }else{
  //       res.status(404).send(util.response("Not Found", 404, "Não foi encontrado nenhum usuario", "api/usuarios", null ))
  //     }
  //   })
  //   .catch((e) => {
  //     res.status(400).send(util.response("Error", 400, "Ocorreu um erro inesperado ao buscar todos os usuarios.", "api/usuarios", e))
  //   })

  tbl_usuarios.findAll({
    include: [{
      model: tbl_hierarquias
    }]
  }).then((usuario) => {
    res.status(200).send(usuario)
  }).catch((e) => {
    console.error(e)
    res.status(400).send(e)
  })
}

// Buscar o usuario com o id que for passado como parametro
const getOneUsuarios = (req, res, next) => {

  db.sequelize.query(
    `SELECT
      a.id_usuario as id_usuario, 
      a.nome as nome,
      a.email as email,
      a.login as login,
      a.ativo as ativo,
      b.nome_fantasia as nome_fantasia,
      c.nome as hierarquia
    FROM tbl_usuarios as a
      Join tbl_empresas as b on a.fk_usuario_empresa = b.id_empresa
      Join tbl_hierarquias as c on a.fk_usuario_hierarquia = c.id_hierarquia
    WHERE id_usuario = ${req.params.id};`,
    { type: db.sequelize.QueryTypes.SELECT})
    .then((ususarios) => {
      res.status(200).send(ususarios)
    })
    .catch((e) => {
      if(e){
        res.status(400).send(util.response("Error", 400, "Ocorreu um erro inesperado ao buscar todos os usuarios.", e))
      }
    })
}

// Criar um novo usuario
const setUsuario = (req, res, next) => {
  tbl_usuarios.create(req.body)
    .then((usuario) => {
      res.send(usuario)
    })
}

module.exports = {
  setUsuario,
  getAllUsuarios,
  getOneUsuarios
}