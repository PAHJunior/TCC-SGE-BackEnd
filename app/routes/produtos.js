var express = require('express');
var router = express.Router();
const {
    buscarProdutos,
    buscarUmProdutos,
    criarProduto,
    modificarProduto,
    buscarProdutoEstoque
} = require('../controller/produtos')

router.get('/', buscarProdutos);

router.get('/:id', buscarUmProdutos);

router.post('/', criarProduto);

router.patch('/:id', modificarProduto);

router.get('/estoque/:estoque', buscarProdutoEstoque);


module.exports = router;
