module.exports = function (sequelize, DataTypes) {
  const tbl_enderecos = sequelize.define('tbl_enderecos', {
    id_endereco: {
      type: DataTypes.INTEGER(),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    cep: {
      type: DataTypes.CHAR(12),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Campo CEP é obrigátorio.'
        }
      }
    },
    logradouro: {
      type: DataTypes.CHAR(100),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Campo logradouro é obrigátorio.'
        }
      }
    },
    complemento: {
      type: DataTypes.CHAR(100)
    },
    bairro: {
      type: DataTypes.CHAR(50),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Campo bairro é obrigátorio.'
        }
      }
    },
    numero: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Campo numero é obrigátorio.'
        }
      }
    },
    cidade: {
      type: DataTypes.CHAR(50),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Campo cidade é obrigátorio.'
        }
      }
    },
    uf: {
      type: DataTypes.CHAR(2),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Campo UF é obrigátorio.'
        }
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
  tbl_enderecos.associate = function (models) {
    tbl_enderecos.hasMany(models.tbl_usuarios, {
      foreignKey: 'fk_usuario_endereco',
      targetKey: 'id_endereco'
    });
    tbl_enderecos.hasMany(models.tbl_empresas, {
      foreignKey: 'fk_empresa_endereco',
      targetKey: 'id_endereco'
    });
    tbl_enderecos.hasMany(models.tbl_fornecedores, {
      foreignKey: 'fk_fornecedor_endereco',
      targetKey: 'id_endereco'
    });
  }
  return tbl_enderecos
}