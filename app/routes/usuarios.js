var express = require('express');
var router = express.Router();
const { setUsuario, getAllUsuarios, getOneUsuario, modifyUsuario } = require('../controller/usuarios.js')

/* GET usuarios listing. */
router.get('/', getAllUsuarios);

router.get('/:id', getOneUsuario);

// Criar usuario
router.post('/', setUsuario);

// Modificar um usuario
router.patch('/:id', modifyUsuario);

module.exports = router;
