var express = require('express');
var router = express.Router();
const { buscarEmpresa } = require('../controller/empresas')

/* GET usuarios listing. */
router.get('/', buscarEmpresa);

module.exports = router;
