var express = require('express');
var router = express.Router();
const {
    buscarTipo_documento,
    buscarUmTipo_documento,
    criarTipo_documento,
    modificarTipo_documento
} = require('../controller/tipo_documentos')

/* Buscar todos os tipos de documento */
router.get('/', buscarTipo_documento);

/* Buscar um tipo de documento. */
router.get('/:id', buscarUmTipo_documento);

/* Criar um novo tipo de documento. */
router.post('/', criarTipo_documento);

/* Modificar um tipo de documento. */
router.patch('/:id', modificarTipo_documento);


module.exports = router;
