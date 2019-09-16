module.exports = function (sequelize, DataTypes){
    const tbl_unid_medidas = sequelize.define('tbl_unid_medidas',{
        id_unid_medida: {
            type: DataTypes.INTEGER(),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataTypes.CHAR(45),
            allowNull: false,
            validate: {
                notNull: {
                  msg: 'Campo nome é obrigátorio.'
                }
              }
        },
        descricao: {
            type: DataTypes.CHAR(150)
        },
        ativo: {
			type: DataTypes.BOOLEAN(),
			defaultValue: true,
			allowNull: false,
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
    return tbl_unid_medidas
}