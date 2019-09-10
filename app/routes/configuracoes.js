var express = require('express');
var router = express.Router();
const { buscarBanco } = require('../controller/configuracao_db')

/* GET usuarios listing. */
router.get('/', buscarBanco);

module.exports = router;
