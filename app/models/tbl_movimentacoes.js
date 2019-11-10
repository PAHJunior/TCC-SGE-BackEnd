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
    dt_fabricacao: {
      type: DataTypes.DATE
    },
    dt_validade: {
      type: DataTypes.DATE
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
    preco_unitario: {
      type: DataTypes.NUMERIC(14, 2),
      allowNull: false,
      validate: {
				notNull: {
					msg: 'Campo preço unitario é obrigátorio.'
				}
			}
    },
    documento: {
      type: DataTypes.CHAR(45),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Campo documento é obrigátorio.'
        }
      }
    },
    descricao: {
      type: DataTypes.CHAR(100),
      allowNull: true
    },
    fk_movimentacao_produto: {
      type: DataTypes.INTEGER(),
      references: {
        model: 'tbl_produtos',
        key: 'id_produto'
      }
    },
    fk_meses: {
      type: DataTypes.INTEGER(),
      references: {
        model: 'tbl_meses',
        key: 'id_meses'
      }
    },
    fk_tipo_documento: {
      type: DataTypes.INTEGER(),
      allowNull: false,
      references: {
        model: 'tbl_tipo_documentos',
        key: 'id_tipo_documento'
      },
      validate: {
        notNull: {
          msg: 'Campo tipo de documento é obrigátorio.'
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

    tbl_movimentacoes.belongsTo(models.tbl_tipo_documentos, {
      foreignKey: 'fk_tipo_documento',
      targetKey: 'id_tipo_documento',
      as: 'tipo_documento'
    });
  }
  return tbl_movimentacoes
}