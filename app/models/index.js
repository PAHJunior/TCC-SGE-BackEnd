'use strict';


require('dotenv').config()
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/database/config.json')[env];
const db = {};
let sequelize;
// logging: false -> Colocar dentro do config para parar de aparecer o log
sequelize = new Sequelize(config.database, config.username, config.password, config);
sequelize.authenticate()
  .then(() => {
    console.log(`Conexao bem sucedida com o bando de dados.`);
  })
  .catch(err => {
    console.error(`Nao foi possivel conectar ao banco de dados:`, err);
  });


fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;