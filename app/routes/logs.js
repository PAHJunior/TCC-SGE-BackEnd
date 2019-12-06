var express = require('express');
var router = express.Router();
const { selectLog } = require('../controller/logs.js')

/* Buscar todas os logs */
router.get('/:limite', selectLog);


module.exports = router;
