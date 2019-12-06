const MongoClient = require('mongodb').MongoClient
const url = "mongodb://root:root2019@ds251618.mlab.com:51618/sgedb"
const util = require('./util');

const insertLog = async (usuario, acao, tabela, descricao) => {
  await MongoClient.connect(url, function (err, db) {
    if (err) console.error('Erro no mongodb!!');
    var dbo = db.db("sgedb");
    var log = {
      usuario: usuario,
      acao: acao,
      tabela: tabela,
      descricao: descricao,
      dtcriacao: new Date()
    };
    dbo.collection("sgelogs").insertOne(log, function (err, res) {
      if (err) console.error('Erro no mongodb!!');
      db.close();
    });
  });
}

const selectLog = async (req, res, next) => {
  let today = util.timestamp()
  let mesanterior = util.timestamp()
  mesanterior = mesanterior.split('-')
  mesanterior = `${mesanterior[0]}-${mesanterior[1] - 1}-${mesanterior[2]}`

  console.log(today)
  console.log(mesanterior)

  await MongoClient.connect(url, function (err, db) {
    if (err) console.error('Erro no mongodb!!');
    var dbo = db.db("sgedb");
    let limite = req.params.limite
    limite = parseInt(limite)
    dbo.collection("sgelogs").find().limit(limite).toArray(function (err, result) {
      if (err) console.error('Erro no mongodb!!');
      res.status(200).send(util.response("Log", 200, result, "api/log", "GET", null))
      db.close();
    });
  });
}

module.exports = {
  insertLog,
  selectLog
}
