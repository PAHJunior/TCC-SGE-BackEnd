var express = require('express');
var router = express.Router();
const {
    reportProdutoServer
} = require('../../controller/relatorios/produtos')


router.get('/produtos/:estoque/:dtinicial/:dtfinal', reportProdutoServer);

module.exports = router;
