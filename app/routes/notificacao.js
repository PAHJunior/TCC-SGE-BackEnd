var express = require('express');
var router = express.Router();
const {
    buscarNotificacao,
    testequery
} = require('../controller/notificacao')

router.get('/:user/:hierarquia', buscarNotificacao);

router.get('/teste', testequery);

module.exports = router;
