const bcrypt = require('bcrypt');
module.exports = function (sequelize, DataTypes) {
  const tbl_usuarios = sequelize.define('tbl_usuarios', {
    id_usuario: {
      type: DataTypes.INTEGER(),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.CHAR(100),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Campo nome é obrigátorio.'
        }
      }
    },
    cpf: {
      type: DataTypes.CHAR(14),
      allowNull: false,
      unique: {
        msg: 'CPF já cadastrado.'
      },
      validate: {
        notNull: {
          msg: 'Campo CPF é obrigátorio.'
        }
      }
    },
    rg: {
      type: DataTypes.CHAR(12),
      allowNull: false,
      unique: {
        msg: 'RG já cadastrado.'
      },
      validate: {
        notNull: {
          msg: 'Campo RG é obrigátorio.'
        }
      }
    },
    dt_nascimento: {
      type: DataTypes.DATEONLY(),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Campo data de nascimento é obrigátorio.'
        }
      }
    },
    email: {
      type: DataTypes.CHAR(100),
      allowNull: false,
      unique: {
        msg: 'Email já cadastrado.'
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'Campo email inválido'
        },
        notNull: {
          msg: 'Campo email é obrigátorio.'
        }
      }
    },
    telefone: {
      type: DataTypes.CHAR(20),
      allowNull: true
    },
    celular: {
      type: DataTypes.CHAR(20),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Campo celular é obrigátorio.'
        }
      }
    },
    login: {
      type: DataTypes.CHAR(45),
      allowNull: false,
      unique: {
        msg: 'Login já cadastrado'
      },
      validate: {
        notNull: {
          msg: 'Campo login é obrigátorio.'
        }
      }
    },
    senha: {
      type: DataTypes.CHAR(60),
      allowNull: false,
      validate: {
        len: {
          args: [5, 45],
          msg: 'Sua senha deverá conter no mínimo 5 e no maximo 45 caracteres'
        },
        notNull: {
          msg: 'Campo senha é obrigátorio.'
        }
      }
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

  // Antes de criar o usuario, criptografe a senha dele.
  tbl_usuarios.beforeCreate((tbl_usuarios, options) => {
    const salt = bcrypt.genSaltSync()
    return bcrypt.hash(tbl_usuarios.senha, salt)
      .then((hashedPw) => {
        tbl_usuarios.senha = hashedPw;
      });
  })

  // Antes de atualizar o usuario, criptografe a senha dele.
  tbl_usuarios.beforeBulkUpdate((tbl_usuarios, options) => {
    if (tbl_usuarios.attributes.senha) {
      const salt = bcrypt.genSaltSync()
      return bcrypt.hash(tbl_usuarios.attributes.senha, salt)
        .then((hashedPw) => {
          tbl_usuarios.attributes.senha = hashedPw;
        });
    }
  })
  // Antes do usuario ser atualizado, some + 1 na versãoLocal
  tbl_usuarios.beforeBulkUpdate((tbl_usuarios, options) => {
    if (tbl_usuarios.attributes.versaoLocal > 0) {
      return tbl_usuarios.attributes.versaoLocal = tbl_usuarios.attributes.versaoLocal + 1
    } else {
      return tbl_usuarios.attributes.versaoLocal = 1
    }
  })


  // Associando as tabelas de endereço, empresa e hierarquia
  tbl_usuarios.associate = function (models) {
    tbl_usuarios.belongsTo(models.tbl_hierarquias, {
      foreignKey: 'fk_usuario_hierarquia',
      targetKey: 'id_hierarquia',
      as: 'hierarquia'
    });
    tbl_usuarios.belongsTo(models.tbl_empresas, {
      foreignKey: 'fk_usuario_empresa',
      targetKey: 'id_empresa',
      as: 'empresa'
    });
    tbl_usuarios.belongsTo(models.tbl_enderecos, {
      foreignKey: 'fk_usuario_endereco',
      targetKey: 'id_endereco',
      as: 'endereco'
    });
  }

  return tbl_usuarios
}
