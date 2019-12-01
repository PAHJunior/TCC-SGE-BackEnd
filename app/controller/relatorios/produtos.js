const db = require('../../models')
const client = require('jsreport-client')('http://localhost:5488')
const util = require('../util');
const {
  tbl_produtos,
  tbl_unid_medidas,
  tbl_categoria_produtos,
  tbl_grupo_produtos,
  tbl_fornecedores,
  tbl_estoques
} = require('../../models');
const Op = db.Sequelize.Op;

const reportProdutoServer = async (req, res, next) => {
  let produtos = await tbl_produtos.findAll({
    attributes: [
      'id_produto',
      'codigo_produto',
      'nome_produto',
      'preco_unitario',
      'saldo',
      'ativo',
      'fk_produto_estoque',
      'createdAt',
      [db.sequelize.fn('date_format', db.sequelize.col('tbl_produtos.createdAt'), '%d-%m-%Y'), 'createdAt']
    ],
    include: [
    {
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'versaoLocal']
      },
      model: tbl_estoques,
      as: 'estoque'
    }],
    where: {
      fk_produto_estoque: req.params.estoque,
      createdAt: {
        [Op.lte]: util.data_yyymmdd(req.params.dtfinal),
        [Op.gte]: util.data_yyymmdd(req.params.dtinicial)
      }
    }
  })

  const data = {
    recipe: 'chrome-pdf',
    engine: 'handlebars',
    template: {
      shortid: 'rkJTnK2ce'
    },
    data: {
      items: await produtos.map((prod) => {
        return {
          cod_produto: prod.codigo_produto,
          produto: prod.nome_produto,
          saldo: prod.saldo,
          dtcriacao: prod.createdAt,
          estoque: prod.estoque.nome_estoque,
          status: prod.ativo ? 'Ativo' : 'Inativo',
          precounit: prod.preco_unitario
        }
      })
    }
  }
  
  client.render(data)
    .then((response) => response.pipe(res))
    .catch(next)
}

module.exports = {
  reportProdutoServer
}