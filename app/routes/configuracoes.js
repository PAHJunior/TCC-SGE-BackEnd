var express = require('express');
var router = express.Router();
const { buscarConfiguracao } = require('../controller/configuracao_db')

/* GET usuarios listing. */
router.get('/', buscarConfiguracao);

module.exports = router;
