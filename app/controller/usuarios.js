const {
  tbl_usuarios,
  tbl_hierarquias,
  tbl_empresas,
  tbl_enderecos
} = require('../models');
const util = require('./util');
const bcrypt = require('bcrypt');
const db = require('../models')

// Buscar todos os usuarios
const buscarTodosUsuarios = (req, res, next) => {

  tbl_usuarios.findAll({
    attributes: {
      exclude: ['senha', 'fk_usuario_endereco', 'fk_usuario_empresa', 'fk_usuario_hierarquia']
    },
    include: [{
      attributes: ['razao_social', 'nome_fantasia', 'cnpj', 'segmento', 'id_empresa'],
      model: tbl_empresas,
      as: 'empresa'
    },
    {
      attributes: ['nome', 'id_hierarquia'],
      model: tbl_hierarquias,
      as: 'hierarquia'
    },
    {
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'versaoLocal']
      },
      model: tbl_enderecos,
      as: 'endereco'
    }
    ],
    where: {
      ativo: 1
    }
  }).then((usuario) => {

    if ((usuario == null) || (usuario == undefined) || (usuario.length == 0)) {
      res.status(404)
        .send(util.response("Erro", 404, "Usúario não encontrado", "api/usuarios", "GET", null))
    } else {
      res.status(200)
        .send(util.response("Get Usuarios", 200, usuario, "api/usuarios", "GET", null))
    }
  }).catch((e) => {
    let error = console.error(e)
    res.status(400)
      .send(util.response("Error", 400, 'Ocorreu um error ao buscar os usuarios', "api/usuarios", "GET", error))
  })
}

// Buscar o usuario com o id que for passado como parametro
const buscarUmUsuario = (req, res, next) => {

  tbl_usuarios.findAll({
    attributes: {
      exclude: ['senha', 'fk_usuario_endereco', 'fk_usuario_empresa', 'fk_usuario_hierarquia']
    },
    include: [{
      attributes: ['razao_social', 'nome_fantasia', 'cnpj', 'segmento', 'id_empresa'],
      model: tbl_empresas,
      as: 'empresa'
    },
    {
      attributes: ['nome', 'id_hierarquia'],
      model: tbl_hierarquias,
      as: 'hierarquia'
    },
    {
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'versaoLocal', 'id_endereco']
      },
      model: tbl_enderecos,
      as: 'endereco'
    }
    ],
    where: {
      id_usuario: req.params.id,
      ativo: 1
    }
  }).then((usuario) => {

    if ((usuario == null) || (usuario == undefined) || (usuario.length == 0)) {
      res.status(404)
        .send(util.response("Not Found", 404, usuario, "api/usuarios", "GET", null))
    } else {
      res.status(200)
        .send(util.response("Get Usuario", 200, usuario, "api/usuarios", "GET", null))
    }
  }).catch((e) => {
    let error = console.error(e)
    res.status(400)
      .send(util.response("Error", 400, usuario, "api/usuarios", "GET", error))
  })
}

// Criar um novo usuario
const criarUsuario = (req, res, next) => {
  // Separando os dados de endereco, empresa e hierarquia
  const endereco = req.body.endereco;

  return db.sequelize.transaction((t) => {
    return tbl_enderecos.create(endereco, {
      transaction: t
    })
      .then((endereco) => {
        let usuario = {
          nome: req.body.nome,
          email: req.body.email,
          login: req.body.login,
          senha: req.body.senha,
          fk_usuario_empresa: req.body.fk_usuario_empresa,
          fk_usuario_hierarquia: req.body.fk_usuario_hierarquia,
          fk_usuario_endereco: endereco.id_endereco
        }
        return tbl_usuarios.create(usuario, {
          transaction: t
        })
      })
  })
    .then((result) => {
      res.status(201).send(util.response("Cadastrar usúario", 201, `usúario ${result.login} criado com sucesso`, "api/usuario", "POST"))
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
      res.status(400).send(util.response("Erros", 400, `Encontramos alguns erros`, "api/usuario", "POST", msg_erro))
    })
}

// Modificar um usuario
const modificarUsuario = async (req, res, next) => {

  // Buscando o usuario pelo id e guardando dentro de user
  const user = await tbl_usuarios.findByPk(req.params.id)
  try {

    if (user !== null) {
      // adicionando a versão local ao corpo da requisição
      req.body['versaoLocal'] = user.versaoLocal
      // enviando a requisição de atualização
      tbl_usuarios.update(req.body, {
        where: {
          id_usuario: req.params.id
        }
      })
        .then((usuarios) => {
          // se o retorno for 1, sucesso
          if (usuarios == 1) {
            res.status(200).send(util.response("Sucesso", 200, "Alterado com sucesso", "api/usuario", "PATCH", null))
          } else {
            res.status(204).send(util.response("Sem alterações", 204, null, "api/usuario", "PATCH", null))
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
          res.status(400).send(util.response("Erros", 400, `Encontramos alguns erros`, "api/usuario", "PATCH", msg_erro))
        })
    } else {
      res.status(400).send(util.response("Erros", 404, `Usúario não foi encontrado`, "api/usuario", "PATCH", null))
    }
  } catch (error) {
    let msg_erro = []
    msg_erro.push(util.msg_error(
      "Ocorreu um erro",
      error,
      null,
      null,
      null))
    res.status(400).send(util.response("Erros", 400, `Encontramos alguns erros`, "api/usuario", "PATCH", msg_erro))
  }
}

const loginUsuario = async (req, res, next) => {
  const usuario = await tbl_usuarios.findOne({
    where: {
      login: req.body.login
    }
  })

  if (!await bcrypt.compare(req.body.senha, usuario.senha)) {
    req.session.isLogado = false
    req.session.usuario = false
    return res.status(400).send(util.response("Erro", 400, "Senha inválida", "api/usuario/login", "POST", null))
  }
  else {
    req.session.isLogado = true
    req.session.user = usuario
    const user = {
      nome: usuario.nome,
      email: usuario.email,
      login: usuario.login,
      ativo: usuario.ativo
    }
    return res.status(200).send(util.response("Login", 200, user, "api/usuario/login", "POST", null))
  }
}

module.exports = {
  criarUsuario,
  buscarTodosUsuarios,
  buscarUmUsuario,
  modificarUsuario,
  loginUsuario
}