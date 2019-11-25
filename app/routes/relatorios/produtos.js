var express = require('express');
var router = express.Router();
const {
    relatoriosProdutos,
    reportproduto,
    jsreportPDF
} = require('../../controller/relatorios/produtos')

router.get('/produtos', relatoriosProdutos);

router.get('/produtos2', reportproduto);

router.get('/produtos3', jsreportPDF);

module.exports = router;
