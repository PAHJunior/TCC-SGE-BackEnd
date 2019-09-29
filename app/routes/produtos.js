var express = require('express');
var router = express.Router();
const {
    buscarProdutos,
    buscarUmProdutos,
    criarProduto,
    modificarProduto
} = require('../controller/produtos')

/* Buscar todos os produtos */
router.get('/', buscarProdutos);

/* Buscar um produtos. */
router.get('/:id', buscarUmProdutos);

/* Criar um grupo. */
router.post('/', criarProduto);

/* Modificar um grupo. */
router.patch('/:id', modificarProduto);


module.exports = router;
