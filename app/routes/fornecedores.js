var express = require('express');
var router = express.Router();
const { buscarFornecedores, buscarUmFornecedores, cadastrarFornecedor, modificarFornecedor } = require('../controller/fornecedores')

/* GET usuarios listing. */
router.get('/', buscarFornecedores);

router.get('/:id', buscarUmFornecedores);

router.post('/', cadastrarFornecedor);

router.patch('/:id', modificarFornecedor);

module.exports = router;
