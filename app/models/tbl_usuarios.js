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
  },
    {
      hooks: {
        beforeCreate: tbl_usuarios => {
          const salt = bcrypt.genSaltSync()
          tbl_usuarios.senha = bcrypt.hashSync(tbl_usuarios.senha, salt)
          return Promise.resolve(tbl_usuarios);
        },
        afterValidate: tbl_usuarios => {
          tbl_usuarios.versaoLocal = 1;
        }
      }
    }
  )

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