const bcrypt = require('bcrypt');
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

  tbl_usuarios.beforeCreate((tbl_usuarios, options) => {
    const salt = bcrypt.genSaltSync()
    return bcrypt.hash(tbl_usuarios.senha, salt)
      .then((hashedPw) => {
        tbl_usuarios.senha = hashedPw;
      });
  })

  tbl_usuarios.beforeBulkUpdate((tbl_usuarios, options) => {
    if (tbl_usuarios.attributes.senha) {
      const salt = bcrypt.genSaltSync()
      return bcrypt.hash(tbl_usuarios.attributes.senha, salt)
      .then((hashedPw) => { 
        tbl_usuarios.attributes.senha = hashedPw;
      });
    }
  })
  tbl_usuarios.beforeBulkUpdate((tbl_usuarios, options) => {
    if (tbl_usuarios.attributes.versaoLocal > 0) {
      return tbl_usuarios.attributes.versaoLocal = tbl_usuarios.attributes.versaoLocal + 1
    }else{
      return tbl_usuarios.attributes.versaoLocal = 1
    }
  })


  // Associando as tabelas de endereço, empresa e hierarquia
  tbl_usuarios.associate = function (models) {
    tbl_usuarios.belongsTo(models.tbl_hierarquias,
      {
        foreignKey: 'fk_usuario_hierarquia',
        targetKey: 'id_hierarquia',
        as: 'hierarquia'
      });
    tbl_usuarios.belongsTo(models.tbl_empresas,
      {
        foreignKey: 'fk_usuario_empresa',
        targetKey: 'id_empresa',
        as: 'empresa'
      });
    tbl_usuarios.belongsTo(models.tbl_enderecos,
      {
        foreignKey: 'fk_usuario_endereco',
        targetKey: 'id_endereco',
        as: 'endereco'
      });
  }

  return tbl_usuarios
}