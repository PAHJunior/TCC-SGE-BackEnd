var express = require('express');
var router = express.Router();
const { buscarCategoria_produtos } = require('../controller/categoria_produtos')

/* GET usuarios listing. */
router.get('/', buscarCategoria_produtos);

module.exports = router;
