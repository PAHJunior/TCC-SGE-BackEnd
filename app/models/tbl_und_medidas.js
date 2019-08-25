module.exports = function (sequelize, DataTypes){
    const tbl_und_medidas = sequelize.define('tbl_und_medidas',{
        id_und_medidas: {
            type: DataTypes.INTEGER(),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataTypes.CHAR(45),
            allowNull: false
        },
        desc: {
            type: DataTypes.CHAR(150)
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
    return tbl_und_medidas
}