var express = require('express');
var router = express.Router();
const {
    buscarCategoria_produtos,
    buscarUmaCategoria_produto
} = require('../controller/categoria_produtos')

/* Buscar todas as categoria */
router.get('/', buscarCategoria_produtos);

/* Buscar uma categoria. */
router.get('/:id', buscarUmaCategoria_produto);

module.exports = router;
