module.exports = function (sequelize, DataTypes) {
    const tbl_setores = sequelize.define('tbl_setores',
        {
            id_setor: {
                type: DataTypes.INTEGER(),
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            nome: {
                type: DataTypes.CHAR(30),
                allowNull: false
            },
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW()
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: true
            }
        },
        {
            hooks: {

            }
        })
    return tbl_setores
}