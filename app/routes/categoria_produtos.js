var express = require('express');
var router = express.Router();
const {
    buscarCategoria_produtos,
    buscarUmaCategoria_produto,
    criarCategoria_produto,
    modificarCategoria_produto
} = require('../controller/categoria_produtos')

/* Buscar todas as categoria */
router.get('/', buscarCategoria_produtos);

/* Buscar uma categoria. */
router.get('/:id', buscarUmaCategoria_produto);

/* Criar uma categoria. */
router.post('/', criarCategoria_produto);

/* Modificar uma categoria. */
router.patch('/:id', modificarCategoria_produto);

module.exports = router;
