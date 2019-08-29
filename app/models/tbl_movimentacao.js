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
			allowNull: false
		},
		dt_movimentacao: {
			type: DataTypes.DATE,
			allowNull: false
		},
		quantidade: {
			type: DataTypes.INTEGER(),
			allowNull: false
		},
		fk_movimentacao_produto: {
			type: DataTypes.INTEGER(),
			references: {
				model: 'tbl_movimentacoes',
				key: 'id_movimentacao'
			}
		},
		versaroLocal: {
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