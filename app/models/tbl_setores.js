module.exports = function (sequelize, DataTypes){
    const tbl_setores = sequelize.define('tbl_setores',{
        id_setor: {
            type: DataTypes.INTEGER(),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        nome: {
            type: DataTypes.CHAR(15),
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW()
        },
        updatedAt: {
            type: DataTypes.DATE,
        }
    }, {
        hooks: {
            afterInit: (setores, options) => {
                console.log('afterInit Tabela criada')
                console.log(setores)
            },
            afterDefine: (setores, options) => {
                console.log('afterDefine Tabela criada')
                console.log(setores)
            }
        }
    })
    return tbl_setores
}