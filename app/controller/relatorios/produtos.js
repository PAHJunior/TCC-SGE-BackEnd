const edge = require('edge.js');
const path = require('path');

const {
  tbl_produtos
} = require('../../models');

edge.registerViews(path.join(__dirname, '../../../app/views/relatorios'))


const relatoriosProdutos = async (req, res, next) => {
  tbl_produtos.findAll()
    .then(async (produtos) => {
      // res.send(produtos);
      produtos['total'] = await produtos.reduce((sum, produtos) => {
        return sum + parseFloat(produtos.preco_unitario)
      }, 0)
      produtos['total'] = parseFloat(produtos.total).toFixed(2)
      return produtos
    })
    .then((produtos) => {
      produtos.forEach(item => {
        item.createdAt = '20/04/1999'
        console.log(item.createdAt)
      });
      return produtos
    })
    .then((produtos) => {
      res.send(edge.render('produtos', { produtos }))
    })
    .catch((error) => {
      res.render('error', { error: error })
    })
}

module.exports = {
  relatoriosProdutos
}