const {
    tbl_categoria_produtos
  } = require('../models');
  const util = require('./util');
  const db = require('../models')
  
  const buscarCategoria_produtos = (req, res, next) => {
    tbl_categoria_produtos.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    })
      .then((categoria_produtos) => {
        if ((categoria_produtos == null) || (categoria_produtos == undefined) || (categoria_produtos.length == 0)) {
          res.status(404)
            .send(util.response("Erro", 404, "Categoria produto não encontrada", "api/categoria_produtos", "GET", null))
        } else {
          res.status(200)
            .send(util.response("Buscar categoria produto", 200, categoria_produtos, "api/categoria_produtos", "GET", null))
        }
      }).catch((e) => {
        let error = console.error(e)
        res.status(400)
          .send(util.response("Error", 400, 'Ocorreu um error ao buscar a categoria do produto', "api/categoria_produtos", "GET", error))
      })
  }

  const buscarUmaCategoria_produto = (req, res, next) => {
    tbl_categoria_produtos.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
      where: {
        id_categoria_produto: req.params.id
      }
    })
      .then((categoria_produtos) => {
        if ((categoria_produtos == null) || (categoria_produtos == undefined) || (categoria_produtos.length == 0)) {
          res.status(404)
            .send(util.response("Erro", 404, "Categoria produto não encontrada", "api/categoria_produtos", "GET", null))
        } else {
          res.status(200)
            .send(util.response("Buscar categoria produto", 200, categoria_produtos, "api/categoria_produtos", "GET", null))
        }
      }).catch((e) => {
        let error = console.error(e)
        res.status(400)
          .send(util.response("Error", 400, 'Ocorreu um error ao a categoria do produto', "api/categoria_produtos", "GET", error))
      })
  }
  
  module.exports = {
    buscarCategoria_produtos,
    buscarUmaCategoria_produto
  }