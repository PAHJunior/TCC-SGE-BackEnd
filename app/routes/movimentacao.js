var express = require('express');
var router = express.Router();
const {
    buscarMovimentacao,
    criarMovimentacao
} = require('../controller/movimentacao')

router.post('/', criarMovimentacao);
router.get('/', buscarMovimentacao);

module.exports = router;
