var express = require('express');
var router = express.Router();
const { buscarHierarquia, buscarUmaHierarquia, cadastrarHierarquia, modificarHierarquia } = require('../controller/hierarquias.js')

/* Buscar todas as hierarquias */
router.get('/', buscarHierarquia);

/* Buscar uma hierarquia */
router.get('/:id', buscarUmaHierarquia);

/* Cadastrar uma hierarquia */
router.post('/', cadastrarHierarquia);

/* Modificar uma hierarquia */
router.patch('/:id', modificarHierarquia);


module.exports = router;
