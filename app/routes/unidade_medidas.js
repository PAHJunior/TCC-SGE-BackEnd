var express = require('express');
var router = express.Router();
const {
    buscarUnid_medida,
    buscarUmUnid_medida,
    criarUnid_medida,
    modificarUnid_medida
} = require('../controller/unidade_medidas')

/* Buscar todos os grupo */
router.get('/', buscarUnid_medida);

/* Buscar um grupo. */
router.get('/:id', buscarUmUnid_medida);

/* Criar um grupo. */
router.post('/', criarUnid_medida);

/* Modificar um grupo. */
router.patch('/:id', modificarUnid_medida);


module.exports = router;
