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
		fk_movimentacao_produto: {
			type: DataTypes.INTEGER(),
			references: {
				model: 'tbl_movimentacoes',
				key: 'id_movimentacao'
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
	return tbl_movimentacoes
}