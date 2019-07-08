module.exports = function (sequelize, DataTypes){
    const tbl_estoques = sequelize.define('tbl_estoques',{
        id_estoque: {
            type: DataTypes.INTEGER(),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        estoque_seguranca: {
            type: DataTypes.NUMERIC(2,2),
            allowNull: false,
        },
        quantidade_total: {
            type: DataTypes.INTEGER(),
            allowNull: false
        },
        valor_estoque: {
            type: DataTypes.NUMERIC(10,2),
            allowNull: false
        },
        fk_estoque_produto: {
            type: DataTypes.INTEGER(),
            references: {
                model: 'tbl_produtos',
                key: 'id_produto'
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
    return tbl_estoques
}