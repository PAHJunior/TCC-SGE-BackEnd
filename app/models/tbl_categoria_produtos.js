module.exports = function (sequelize, DataTypes) {
	const tbl_categoria_produtos = sequelize.define('tbl_categoria_produtos', {
		id_categoria_produto: {
			type: DataTypes.INTEGER(),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		nome: {
			type: DataTypes.CHAR(45),
			allowNull: false
		},
		desc: {
			type: DataTypes.CHAR(150),
			allowNull: true,
        },
        fk_grupo_produto: {
            type: DataTypes.INTEGER(),
            references: {
              model: 'tbl_grupo_produtos',
              key: 'id_grupo_produto'
            }
          },
        ativo: {
			type: DataTypes.BOOLEAN(),
			defaultValue: true,
			allowNull: false
		},
		createdAt: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW()
		},
		updatedAt: {
			type: DataTypes.DATE,
		}
	})
	return tbl_categoria_produtos
}