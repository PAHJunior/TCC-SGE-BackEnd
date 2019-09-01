var express = require('express');
var router = express.Router();
const { setUsuario, getAllUsuarios, getOneUsuarios } = require('../controller/usuarios.js')

/* GET usuarios listing. */
router.get('/', getAllUsuarios);

router.get('/:id', getOneUsuarios);

router.post('/', setUsuario);

module.exports = router;
