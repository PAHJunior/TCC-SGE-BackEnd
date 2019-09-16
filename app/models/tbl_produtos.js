module.exports = function (sequelize, DataTypes) {
  const tbl_produtos = sequelize.define('tbl_produtos', {
    id_produto: {
      type: DataTypes.INTEGER(),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    codigo_produto: {
      type: DataTypes.INTEGER(),
      allowNull: true,
      validate: {
        validate(produto) {
          // Se o codigo do produto for nulo,
          // o id_produto irar se repetir no codigo_produto
          if(produto == null){
            produto = this.id_produto
          }
        }
      }
    },
    nome_produto: {
      type: DataTypes.CHAR(100),
      allowNull: false,
      validate: {
				notNull: {
					msg: 'Campo nome produto é obrigátorio.'
				}
			}
    },
    preco_unitario: {
      type: DataTypes.NUMERIC(10, 2),
      allowNull: false,
      validate: {
				notNull: {
					msg: 'Campo preço unitario é obrigátorio.'
				}
			}
    },
    tipo_produto: {
      type: DataTypes.CHAR(50),
      allowNull: false,
      validate: {
				notNull: {
					msg: 'Campo tipo produto é obrigátorio.'
				}
			}
    },
    metodo_estocagem: {
      type: DataTypes.CHAR(50),
      allowNull: false,
      validate: {
				notNull: {
					msg: 'Campo metodo de estocagem é obrigátorio.'
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
    fk_produto_unid_medida: {
      type: DataTypes.INTEGER(),
      references: {
        model: 'tbl_unid_medidas',
        key: 'id_unid_medida'
      }
    },
    fk_produto_categoria: {
      type: DataTypes.INTEGER(),
      references: {
        model: 'tbl_categoria_produtos',
        key: 'id_categoria_produto'
      }
    },
    fk_produto_grupo: {
      type: DataTypes.INTEGER(),
      references: {
        model: 'tbl_categoria_produtos',
        key: 'id_categoria_produto'
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
  return tbl_produtos
}