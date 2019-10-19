const { tbl_fornecedores, tbl_representantes, tbl_enderecos } = require('../models');
const util = require('./util');
const bcrypt = require('bcrypt');
const db = require('../models')

const buscarFornecedores = (req, res, next) => {
  tbl_fornecedores.findAll({
    attributes: {
      exclude: ['fk_fornecedor_endereco', 'fk_fornecedor_representante']
    },
    include: [
      {
        attributes: {
          exclude: ['ativo', 'versaoLocal', 'createdAt', 'updatedAt']
        },
        model: tbl_representantes,
        as: 'representante'
      },
      {
        attributes: {
          exclude: ['versaoLocal', 'createdAt', 'updatedAt']
        },
        model: tbl_enderecos,
        as: 'endereco'
      },
    ]
  })
    .then((fornecedor) => {
      if ((fornecedor == null) || (fornecedor == undefined) || (fornecedor.length == 0)) {
        res.status(200)
          .send(util.response("Not Found", 404, fornecedor, "api/fornecedores", "GET", null))
      }
      else {
        res.status(200)
          .send(util.response("Buscar Fornecedores", 200, fornecedor, "api/fornecedores", "GET", null))
      }
    }).catch((e) => {
      let error = console.error(e)
      res.status(200)
        .send(util.response("Error", 400, 'Ocorreu um error ao buscar os fornecedores', "api/fornecedores", "GET", error))
    })
}

const buscarUmFornecedores = (req, res, next) => {
  tbl_fornecedores.findAll({
    attributes: {
      exclude: ['fk_fornecedor_endereco', 'fk_fornecedor_representante']
    },
    include: [
      {
        attributes: {
          exclude: ['ativo', 'versaoLocal', 'createdAt', 'updatedAt']
        },
        model: tbl_representantes,
        as: 'representante'
      },
      {
        attributes: {
          exclude: ['versaoLocal', 'createdAt', 'updatedAt']
        },
        model: tbl_enderecos,
        as: 'endereco'
      },
    ],
    where: {
      id_fornecedor: req.params.id
    }
  })
    .then((fornecedor) => {
      if ((fornecedor == null) || (fornecedor == undefined) || (fornecedor.length == 0)) {
        res.status(200)
          .send(util.response("Not Found", 404, fornecedor, "api/fornecedores", "GET", null))
      }
      else {
        res.status(200)
          .send(util.response("Buscar Fornecedores", 200, fornecedor, "api/fornecedores", "GET", null))
      }
    }).catch((e) => {
      let error = console.error(e)
      res.status(200)
        .send(util.response("Error", 400, 'Ocorreu um error ao buscar os fornecedores', "api/fornecedores", "GET", error))
    })
}

const cadastrarFornecedor = (req, res, next) => {
  // Separando os dados de endereco, empresa e hierarquia
  const endereco = req.body.endereco;
  const representante = req.body.representante;

  return db.sequelize.transaction((t) => {
    return tbl_enderecos.create(endereco, {
      transaction: t
    })
      .then((endereco) => {
        req.body["fk_fornecedor_endereco"] = endereco.id_endereco
        return tbl_representantes.create(representante, {
          transaction: t
        }).then((representante) => {
          req.body["fk_fornecedor_representante"] = representante.id_representante
          return tbl_fornecedores.create(req.body, {
            transaction: t
          })
        })
      })
  })
    .then((result) => {
      res.status(201).send(util.response("Cadastrar fornecedor", 201, `fornecedor ${result.nome} criado com sucesso`, "api/fornecedores", "POST"))
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
      res.status(200).send(util.response("Erros", 400, `Encontramos alguns erros`, "api/fornecedores", "POST", msg_erro))
    })
}

const modificarFornecedor = async (req, res, next) => {
  // Buscando o fornecedor pelo id
  const fornecedor = await tbl_fornecedores.findByPk(req.params.id)
  try {
    if (fornecedor !== null) {
      // adicionando a versão local ao corpo da requisição
      req.body['versaoLocal'] = fornecedor.versaoLocal
      // enviando a requisição de atualização
      tbl_fornecedores.update(req.body, {
        where: {
          id_fornecedor: req.params.id
        }
      })
        .then((fornecedor) => {
          // se o retorno for 1, sucesso
          if (fornecedor == 1) {
            res.status(200).send(util.response("Sucesso", 200, "Alterado com sucesso", "api/fornecedores", "PATCH", null))
          } else {
            res.status(204).send(util.response("Sem alterações", 204, null, "api/fornecedores", "PATCH", null))
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
          res.status(200).send(util.response("Erros", 400, `Encontramos alguns erros`, "api/fornecedores", "PATCH", msg_erro))
        })
    } else {
      res.status(200).send(util.response("Erros", 404, `Usúario não foi encontrado`, "api/fornecedores", "PATCH", null))
    }
  } catch (error) {
    let msg_erro = []
    msg_erro.push(util.msg_error(
      "Ocorreu um erro",
      error,
      null,
      null,
      null))
    res.status(200).send(util.response("Erros", 400, `Encontramos alguns erros`, "api/fornecedores", "PATCH", msg_erro))
  }
}

module.exports = {
  buscarFornecedores,
  buscarUmFornecedores,
  cadastrarFornecedor,
  modificarFornecedor
}
