module.exports = function (sequelize, DataTypes) {
  const tbl_estoques = sequelize.define('tbl_estoques', {
    id_estoque: {
      type: DataTypes.INTEGER(),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nome_estoque: {
      type: DataTypes.CHAR(50),
      allowNull: false,
      unique: {
        msg: 'Nome estoque já cadastrado.'
      },
      validate: {
        notNull: {
          msg: 'Campo nome estoque é obrigátorio.'
        }
      }
    },
    valor_estoque: {
      type: DataTypes.NUMERIC(14, 2),
      defaultValue: 0.0,
    },
    quantidade_total: {
      type: DataTypes.INTEGER(),
      defaultValue: 0,
    },
    ativo: {
      type: DataTypes.BOOLEAN(),
      defaultValue: true,
      allowNull: false
    },
    versaoLocal: {
      type: DataTypes.INTEGER(),
      defaultValue: 0
    },
    fk_estoque_empresa: {
      type: DataTypes.INTEGER(),
      references: {
        model: 'tbl_empresas',
        key: 'id_empresa'
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW()
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  })

  tbl_estoques.associate = function (models) {
    tbl_estoques.belongsTo(models.tbl_empresas,
      {
        foreignKey: 'fk_estoque_empresa',
        targetKey: 'id_empresa',
        as: 'empresa'
      });
  }
  return tbl_estoques
}