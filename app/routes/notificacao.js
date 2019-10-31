var express = require('express');
var router = express.Router();
const {
    buscarNotificacaoByUser
} = require('../controller/notificacao')

router.get('/:id', buscarNotificacaoByUser);

module.exports = router;
