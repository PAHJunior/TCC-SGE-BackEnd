var express = require('express');
var router = express.Router();
const { setUser } = require('../controller/usuarios.js')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Rota de usuarios');
});


/* GET users listing. */
router.post('/', setUser);

module.exports = router;
