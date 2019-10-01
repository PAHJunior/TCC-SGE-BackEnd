var express = require('express');
var router = express.Router();
const { relatoriosProdutos } = require('../../controller/relatorios/produtos')

router.get('/', relatoriosProdutos);

module.exports = router;
