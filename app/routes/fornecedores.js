var express = require('express');
var router = express.Router();
const { buscarEstoque } = require('../controller/fornecedores')

/* GET usuarios listing. */
router.get('/', buscarEstoque);

module.exports = router;
