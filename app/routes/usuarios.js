var express = require('express');
var router = express.Router();
const {
    criarUsuario,
    buscarTodosUsuarios,
    buscarUmUsuario,
    modificarUsuario,
    loginUsuario
} = require('../controller/usuarios.js')

/* GET usuarios listing. */
router.get('/', buscarTodosUsuarios);

router.get('/:id', buscarUmUsuario);

// Criar usuario
router.post('/', criarUsuario);

// Modificar um usuario
router.patch('/:id', modificarUsuario);

// Login
router.post('/login', loginUsuario);

module.exports = router;
