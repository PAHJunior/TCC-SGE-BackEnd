const {
  tbl_empresas,
  tbl_enderecos,
  tbl_configuracoes
} = require('../models');
const util = require('./util');
const db = require('../models')

const buscarEmpresa = (req, res, next) => {
  tbl_empresas.findAll({
      attributes: {
        exclude: ['fk_empresa_configuracao', 'fk_empresa_endereco']
      },
      include: [{
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'versaoLocal']
          },
          model: tbl_enderecos,
          as: 'endereco'
        },
        {
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'versaoLocal']
          },
          model: tbl_configuracoes,
          as: 'configuracao'
        },
      ]
    })
    .then((empresa) => {
      if ((empresa == null) || (empresa == undefined) || (empresa.length == 0)) {
        res.status(404)
          .send(util.response("Erro", 404, "Empresa não encontrada", "api/empresas", "GET", null))
      } else {
        res.status(200)
          .send(util.response("Buscar Empresa", 200, empresa, "api/empresas", "GET", null))
      }
    }).catch((e) => {
      let error = console.error(e)
      res.status(400)
        .send(util.response("Error", 400, 'Ocorreu um error ao buscar as empresas', "api/empresas", "GET", error))
    })
}

const buscarUmaEmpresa = (req, res, next) => {
  tbl_empresas.findAll({
      attributes: {
        exclude: ['fk_empresa_configuracao', 'fk_empresa_endereco']
      },
      include: [{
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'versaoLocal']
          },
          model: tbl_enderecos,
          as: 'endereco'
        },
        {
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'versaoLocal']
          },
          model: tbl_configuracoes,
          as: 'configuracao'
        },
      ],
      where: {
        id_empresa: req.params.id,
        ativo: 1
      }
    })
    .then((empresa) => {
      if ((empresa == null) || (empresa == undefined) || (empresa.length == 0)) {
        res.status(404)
          .send(util.response("Erro", 404, "Empresa não encontrada", "api/empresas", "GET", null))
      } else {
        res.status(200)
          .send(util.response("Buscar Empresa", 200, empresa, "api/empresas", "GET", null))
      }
    }).catch((e) => {
      let error = console.error(e)
      res.status(400)
        .send(util.response("Error", 400, 'Ocorreu um error ao buscar as empresas', "api/empresas", "GET", error))
    })
}

const criarEmpresa = (req, res, next) => {
  const endereco = req.body.endereco;
  const configuracao = req.body.configuracao;

  return db.sequelize.transaction((t) => {
      return tbl_enderecos.create(endereco, {
          transaction: t
        })
        .then((endereco) => {
          req.body["fk_empresa_endereco"] = endereco.id_endereco
          return tbl_configuracoes.create(configuracao, {
              transaction: t
            })
            .then((configuracao) => {
              req.body["fk_empresa_configuracao"] = configuracao.id_configuracao
              return tbl_empresas.create(req.body, {
                transaction: t
              })
            })
        })
    })
    .then((result) => {
      res.status(201).send(util.response("Cadastrar empresa", 201, `empresa ${result.nome_fantasia} cadastrada com sucesso`, "api/empresa", "POST"))
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
      res.status(400).send(util.response("Erros", 400, `Encontramos alguns erros`, "api/empresa", "POST", msg_erro))
    })
}

const modificarEmpresa = async (req, res, next) => {
  // Buscando o usuario pelo id e guardando dentro de user
  const empresa = await tbl_empresas.findByPk(req.params.id)
  try {

    if (empresa !== null) {
      if (empresa.razao_social == req.body.razao_social) {
        throw `A razão social ${req.body.razao_social} é o mesmo cadastrado anteriormente`
      }
      if (empresa.nome_fantasia == req.body.nome_fantasia) {
        throw `O nome_fantasia ${req.body.nome_fantasia} é o mesmo cadastrado anteriormente`
      }
      if (empresa.telefone == req.body.telefone) {
        throw `O telefone ${req.body.telefone} é o mesmo cadastrado anteriormente`
      }
      if (empresa.cnpj == req.body.cnpj) {
        throw `O cnpj ${req.body.cnpj} é o mesmo cadastrado anteriormente`
      }
      if (empresa.segmento == req.body.segmento) {
        throw `O segmento ${req.body.segmento} é o mesmo cadastrado anteriormente`
      }
      // adicionando a versão local ao corpo da requisição
      req.body['versaoLocal'] = empresa.versaoLocal
      // enviando a requisição de atualização
      tbl_empresas.update(req.body, {
          where: {
            id_empresa: req.params.id
          }
        })
        .then((empresa) => {
          // se o retorno for 1, sucesso
          if (empresa == 1) {
            res.status(200).send(util.response("Sucesso", 200, "Alterado com sucesso", "api/empresas", "PATCH", null))
          } else {
            res.status(204).send(util.response("Sem alterações", 204, null, "api/empresas", "PATCH", null))
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
          res.status(400).send(util.response("Erros", 400, `Encontramos alguns erros`, "api/empresas", "PATCH", msg_erro))
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
  buscarEmpresa,
  buscarUmaEmpresa,
  criarEmpresa,
  modificarEmpresa
}