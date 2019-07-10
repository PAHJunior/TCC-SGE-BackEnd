module.exports = function (sequelize, DataTypes){
    const tbl_produtos = sequelize.define('tbl_produtos',{
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
            type: DataTypes.NUMERIC(10,2),
            allowNull: false
        },
        preco_total_produto: {
            type: DataTypes.NUMERIC(10,2),
        },
        quantidade_total: {
            type: DataTypes.INTEGER(),
            allowNull: false
        },
        tipo_produto: {
            type: DataTypes.CHAR(50),
            allowNull: false
        },
        entrada_produto: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW()
        },
        saida_produto: {
            type: DataTypes.DATE,
        },
        metodo_estocagem: {
            type: DataTypes.CHAR(50),
            allowNull: false
        },
        seguranca_produto: {
            type: DataTypes.NUMERIC(10,2),
        },
        data_fabricacao: {
            type: DataTypes.DATE
        },
        validade: {
            type: DataTypes.DATE
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