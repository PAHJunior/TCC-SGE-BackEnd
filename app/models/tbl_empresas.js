module.exports = function (sequelize, DataTypes) {
	const tbl_empresas = sequelize.define('tbl_empresas', {
		id_empresa: {
			type: DataTypes.INTEGER(),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		ativo: {
			type: DataTypes.BOOLEAN(),
			defaultValue: true,
			allowNull: false
		},
		razao_social: {
			type: DataTypes.CHAR(45),
			allowNull: false
		},
		nome_fantasia: {
			type: DataTypes.CHAR(25),
			allowNull: true,
		},
		telefone: {
			type: DataTypes.CHAR(15),
			allowNull: false,
		},
		cnpj: {
			type: DataTypes.CHAR(20),
			allowNull: false,
			unique: true,
		},
		segmento: {
			type: DataTypes.CHAR(20),
			allowNull: false,
			unique: true,
		},
		fk_empresa_configuracao: {
			type: DataTypes.INTEGER(),
			references: {
				model: 'tbl_configuracoes',
				key: 'id_configuracao'
			}
		},
		fk_empresa_endereco: {
			type: DataTypes.INTEGER(),
			references: {
				model: 'tbl_enderecos',
				key: 'id_endereco'
			}
		},
		fk_empresa_estoque: {
			type: DataTypes.INTEGER(),
			references: {
				model: 'tbl_estoques',
				key: 'id_estoque'
			}
		},
		createdAt: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW()
		},
		updatedAt: {
			type: DataTypes.DATE
		}
	})
	return tbl_empresas
}