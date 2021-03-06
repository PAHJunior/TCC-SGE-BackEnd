module.exports = function (sequelize, DataTypes) {
	const tbl_fornecedores = sequelize.define('tbl_fornecedores', {
		id_fornecedor: {
			type: DataTypes.INTEGER(),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		nome: {
			unique: {
				msg: 'Esse fornecedor já está cadastrada.'
			},
			type: DataTypes.CHAR(100),
			allowNull: false,
			validate: {
				notNull: {
					msg: 'Campo nome é obrigátorio.'
				}
			}
		},
		ativo: {
			type: DataTypes.BOOLEAN(),
			defaultValue: true,
			allowNull: false
		},
		fk_fornecedor_endereco: {
			type: DataTypes.INTEGER(),
			references: {
				model: 'tbl_enderecos',
				key: 'id_endereco'
			}
		},
		fk_fornecedor_representante: {
			type: DataTypes.INTEGER(),
			references: {
				model: 'tbl_representantes',
				key: 'id_representante'
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

	tbl_fornecedores.associate = function (models) {
		tbl_fornecedores.belongsTo(models.tbl_enderecos, {
			foreignKey: 'fk_fornecedor_endereco',
			targetKey: 'id_endereco',
			as: 'endereco'
		});
		tbl_fornecedores.belongsTo(models.tbl_representantes, {
			foreignKey: 'fk_fornecedor_representante',
			targetKey: 'id_representante',
			as: 'representante'
		});
		tbl_fornecedores.hasMany(models.tbl_produtos, {
			foreignKey: 'fk_produto_fornecedor',
			targetKey: 'id_fornecedor'
		});
	}
	return tbl_fornecedores
}