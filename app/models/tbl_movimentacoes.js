module.exports = function (sequelize, DataTypes) {
  const tbl_movimentacoes = sequelize.define('tbl_movimentacoes', {
    id_movimentacao: {
      type: DataTypes.INTEGER(),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    tipo_operacao: {
      type: DataTypes.CHAR(45),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Campo tipo operacao é obrigátorio.'
        }
      }
    },
    dt_movimentacao: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Campo data de movimentação é obrigátorio.'
        }
      }
    },
    quantidade: {
      type: DataTypes.INTEGER(),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Campo quantidade é obrigátorio.'
        }
      }
    },
    ativo: {
      type: DataTypes.BOOLEAN(),
      defaultValue: true,
      allowNull: false
    },
    ajuste: {
      type: DataTypes.BOOLEAN(),
      defaultValue: false,
      allowNull: false
    },
    saldo_produto: {
      defaultValue: 0,
      type: DataTypes.INTEGER(),
      allowNull: true
    },
    fk_movimentacao_produto: {
      type: DataTypes.INTEGER(),
      references: {
        model: 'tbl_movimentacoes',
        key: 'id_movimentacao'
      }
    },
    fk_meses: {
      type: DataTypes.INTEGER(),
      references: {
        model: 'tbl_meses',
        key: 'id_meses'
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

  tbl_movimentacoes.associate = function (models) {
    tbl_movimentacoes.belongsTo(models.tbl_produtos, {
      foreignKey: 'fk_movimentacao_produto',
      targetKey: 'id_produto',
      as: 'produto'
    });

    tbl_movimentacoes.belongsTo(models.tbl_meses, {
      foreignKey: 'fk_meses',
      targetKey: 'id_meses',
      as: 'mes'
    });
  }
  return tbl_movimentacoes
}