const edge = require('edge.js');
const path = require('path');

const {
    tbl_produtos
} = require('../../models');

edge.registerViews(path.join(__dirname, '../../../app/views/relatorios'))


const relatoriosProdutos = async (req, res, next) => {
    tbl_produtos.findAll()
        .then((produtos) => {
            console.log(produtos)
            res.send(edge.render('produtos', { produtos } ))
            // res.send(produtos)
        })
}

module.exports = {
    relatoriosProdutos
}