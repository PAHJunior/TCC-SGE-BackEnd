var express = require('express');
var router = express.Router();
const {
    buscarGrupo_produtos,
    buscarUmGrupo_produto,
    criarGrupo_produto,
    modificarGrupo_produto,
    buscarGrupoByCategoria
} = require('../controller/grupo_produtos')

/* Buscar todos os grupo */
router.get('/', buscarGrupo_produtos);

/* Buscar um grupo. */
router.get('/:id', buscarUmGrupo_produto);

/* Criar um grupo. */
router.post('/', criarGrupo_produto);

/* Modificar um grupo. */
router.patch('/:id', modificarGrupo_produto);

/* Buscar grupo peloo id da categoria um grupo. */
router.get('/:id/categoria', buscarGrupoByCategoria);


module.exports = router;
