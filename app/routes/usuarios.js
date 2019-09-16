var express = require('express');
var router = express.Router();
const { criarUsuario, getAllUsuarios, getOneUsuario, modifyUsuario } = require('../controller/usuarios.js')

/* GET usuarios listing. */
router.get('/', getAllUsuarios);

router.get('/:id', getOneUsuario);

// Criar usuario
router.post('/', criarUsuario);

// Modificar um usuario
router.patch('/:id', modifyUsuario);

module.exports = router;
