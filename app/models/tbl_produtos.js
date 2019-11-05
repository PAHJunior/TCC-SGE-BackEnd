module.exports = function (sequelize, DataTypes) {
  const tbl_produtos = sequelize.define('tbl_produtos', {
    id_produto: {
      type: DataTypes.INTEGER(),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    codigo_produto: {
      type: DataTypes.CHAR(20),
      allowNull: true
    },
    nome_produto: {
      type: DataTypes.CHAR(100),
      allowNull: false,
      unique: {
        msg: 'O produto informado já está cadastrado'
      },
      validate: {
				notNull: {
					msg: 'Campo nome produto é obrigátorio.'
				}
			}
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
    data_fabricacao: {
      type: DataTypes.DATE
    },
    validade: {
      type: DataTypes.DATE
    },
    saldo: {
      type: DataTypes.INTEGER(),
      allowNull: false,
      validate: {
				notNull: {
					msg: 'Campo saldo é obrigátorio.'
				}
			}
    },
    quantidade_min: {
      type: DataTypes.INTEGER(),
      allowNull: false,
      validate: {
				notNull: {
					msg: 'Campo quantidade mínima é obrigátorio.'
				}
			}
    },
    quantidade_max: {
      type: DataTypes.INTEGER(),
      allowNull: false,
      validate: {
				notNull: {
					msg: 'Campo quantidade maxima é obrigátorio.'
				}
			}
    },
    ativo: {
      type: DataTypes.BOOLEAN(),
      defaultValue: true,
      allowNull: false,
    },
    controlaLote: {
      type: DataTypes.BOOLEAN(),
      defaultValue: false,
      allowNull: false,
    },
    fk_produto_unid_medida: {
      type: DataTypes.INTEGER(),
      references: {
        model: 'tbl_unid_medidas',
        key: 'id_unid_medida'
      },
      allowNull: false,
      validate: {
				notNull: {
					msg: 'Selecione uma unidade de medida.'
				}
			}
    },
    fk_produto_categoria: {
      type: DataTypes.INTEGER(),
      references: {
        model: 'tbl_categoria_produtos',
        key: 'id_categoria_produto'
      },
      allowNull: false,
      validate: {
				notNull: {
					msg: 'Selecione uma categoria.'
				}
			}
    },
    fk_produto_grupo: {
      type: DataTypes.INTEGER(),
      references: {
        model: 'tbl_grupo_produtos',
        key: 'id_grupo_produto'
      },
      allowNull: false,
      validate: {
				notNull: {
					msg: 'Selecione um grupo.'
				}
			}
    },
    fk_produto_fornecedor: {
      type: DataTypes.INTEGER(),
      references: {
        model: 'tbl_fornecedores',
        key: 'id_fornecedor'
      },
      allowNull: false,
      validate: {
				notNull: {
					msg: 'Selecione um fornecedor.'
				}
			}
    },
    fk_produto_estoque: {
      type: DataTypes.INTEGER(),
      references: {
        model: 'tbl_estoques',
        key: 'id_estoque'
      },
      allowNull: false,
      validate: {
				notNull: {
					msg: 'Selecione um estoque.'
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

  // Antes do usuario ser atualizado, some + 1 na versãoLocal
  tbl_produtos.beforeBulkUpdate((tbl_produtos, options) => {
    if (tbl_produtos.attributes.versaoLocal > 0) {
      return tbl_produtos.attributes.versaoLocal = tbl_produtos.attributes.versaoLocal + 1
    } else {
      return tbl_produtos.attributes.versaoLocal = 1
    }
  })

  tbl_produtos.associate = function (models) {
    tbl_produtos.belongsTo(models.tbl_unid_medidas, {
      foreignKey: 'fk_produto_unid_medida',
      targetKey: 'id_unid_medida',
      as: 'unidade_medida'
    });
    tbl_produtos.belongsTo(models.tbl_categoria_produtos, {
      foreignKey: 'fk_produto_categoria',
      targetKey: 'id_categoria_produto',
      as: 'categoria'
    });
    tbl_produtos.belongsTo(models.tbl_grupo_produtos, {
      foreignKey: 'fk_produto_grupo',
      targetKey: 'id_grupo_produto',
      as: 'grupo'
    });
    tbl_produtos.belongsTo(models.tbl_fornecedores, {
      foreignKey: 'fk_produto_fornecedor',
      targetKey: 'id_fornecedor',
      as: 'fornecedor'
    });
    tbl_produtos.belongsTo(models.tbl_estoques, {
      foreignKey: 'fk_produto_estoque',
      targetKey: 'id_estoque',
      as: 'estoque'
    });

    // 
    tbl_produtos.hasMany(models.tbl_movimentacoes, {
      foreignKey: 'fk_movimentacao_produto',
      targetKey: 'id_produto'
    });
  }
  return tbl_produtos
}