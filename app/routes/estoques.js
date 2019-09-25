var express = require('express');
var router = express.Router();
const { buscarEstoque, buscarUmEstoque, cadastrarEstoque, modificarEstoque } = require('../controller/estoques')

/* Buscar estoques. */
router.get('/', buscarEstoque);

/* Buscar um unico estoque */
router.get('/:id', buscarUmEstoque);

/* cadastrar estoque */
router.post('/', cadastrarEstoque);

/* modificar estoque */
router.patch('/:id', modificarEstoque);

module.exports = router;
