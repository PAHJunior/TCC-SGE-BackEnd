var express = require('express');
var router = express.Router();
const { buscarEmpresa, buscarUmaEmpresa, criarEmpresa, modificarEmpresa } = require('../controller/empresas')

/* GET usuarios listing. */
router.get('/', buscarEmpresa);

router.get('/:id', buscarUmaEmpresa);

router.post('/', criarEmpresa);

router.patch('/:id', modificarEmpresa);

module.exports = router;
