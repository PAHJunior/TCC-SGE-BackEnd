var express = require('express');
var router = express.Router();
const { criarUsuario, buscarTodosUsuarios, buscarUmUsuario, modificarUsuario } = require('../controller/usuarios.js')

/* GET usuarios listing. */
router.get('/', buscarTodosUsuarios);

router.get('/:id', buscarUmUsuario);

// Criar usuario
router.post('/', criarUsuario);

// Modificar um usuario
router.patch('/:id', modificarUsuario);

module.exports = router;
