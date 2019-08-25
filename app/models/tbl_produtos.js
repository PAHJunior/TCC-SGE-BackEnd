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
			allowNull: false,
		},
		nome_produto: {
			type: DataTypes.CHAR(100),
			allowNull: false
		},
		preco_unitario: {
			type: DataTypes.NUMERIC(10, 2),
			allowNull: false
		},
		tipo_produto: {
			type: DataTypes.CHAR(50),
			allowNull: false
		},
		metodo_estocagem: {
			type: DataTypes.CHAR(50),
			allowNull: false
		},
		data_fabricacao: {
			type: DataTypes.DATE
		},
		validade: {
			type: DataTypes.DATE
		},
		saldo: {
			type: DataTypes.INTEGER(),
			allowNull: false
		},
		quantidade_min: {
			type: DataTypes.INTEGER(),
			allowNull: false
		},
		quantidade_max: {
			type: DataTypes.INTEGER(),
			allowNull: false
		},
		ativo: {
			type: DataTypes.BOOLEAN(),
			defaultValue: true,
			allowNull: false,
		},
		fk_produto_unid_medida: {
			type: DataTypes.INTEGER(),
			references: {
				model: 'tbl_und_medidas',
				key: 'id_und_medidas'
			}
		},
		fk_produto_categoria: {
			type: DataTypes.INTEGER(),
			references: {
				model: 'tbl_categoria_produtos',
				key: 'id_categoria_produto'
			}
		},
		fk_produto_movimentacao: {
			type: DataTypes.INTEGER(),
			references: {
				model: 'tbl_movimentacoes',
				key: 'id_movimentacao'
			}
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