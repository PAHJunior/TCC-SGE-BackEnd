var express = require('express');
var router = express.Router();
const {
    buscarNotificacao
} = require('../controller/notificacao')

router.get('/:user/:hierarquia', buscarNotificacao);

module.exports = router;
