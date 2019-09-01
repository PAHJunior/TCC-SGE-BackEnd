const bcrypt = require('bcrypt');
const db = require('../models');
module.exports = function (sequelize, DataTypes) {
  const tbl_usuarios = sequelize.define('tbl_usuarios', {
    id_usuario: {
      type: DataTypes.INTEGER(),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.CHAR(100),
      allowNull: false
    },
    email: {
      type: DataTypes.CHAR(100),
      allowNull: false,
      unique: true
    },
    login: {
      type: DataTypes.CHAR(45),
      allowNull: false,
      unique: true
    },
    senha: {
      type: DataTypes.CHAR(45),
      allowNull: false
    },
    ativo: {
      type: DataTypes.BOOLEAN(),
      defaultValue: true,
      allowNull: false
    },
    fk_usuario_endereco: {
      type: DataTypes.INTEGER(),
      references: {
        model: 'tbl_enderecos',
        key: 'id_endereco'
      }
    },
    fk_usuario_empresa: {
      type: DataTypes.INTEGER(),
      references: {
        model: 'tbl_empresas',
        key: 'id_empresa'
      }
    },
    fk_usuario_hierarquia: {
      type: DataTypes.INTEGER(),
      references: {
        model: 'tbl_hierarquias',
        key: 'id_hierarquia'
      }
    },
    versaoLocal: {
      type: DataTypes.INTEGER(),
      defaultValue: 0
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW()
    },
    updatedAt: {
      type: DataTypes.DATE,
    }
  })
  tbl_usuarios.associate = function (models){
    tbl_usuarios.belongsTo(models.tbl_hierarquias, {
      foreignKey: 'id_usuario',
      targetKey: 'id_hierarquia'
    })
  }

  tbl_usuarios.beforeCreate((tbl_usuarios, options) => {
    return bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(tbl_usuarios.senha, salt, function (err, hash) {
        tbl_usuarios.senha = hash
      });
    });
  })
  return tbl_usuarios
}