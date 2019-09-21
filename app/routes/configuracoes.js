var express = require('express');
var router = express.Router();
const { buscarConfiguracao, buscarUmaConfiguracao } = require('../controller/configuracao_db')

/* GET usuarios listing. */
router.get('/', buscarConfiguracao);

router.get('/:database', buscarUmaConfiguracao);


module.exports = router;
