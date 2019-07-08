module.exports = function (sequelize, DataTypes){
    const tbl_fornecedores = sequelize.define('tbl_fornecedores',{
        id_fornecedor: {
            type: DataTypes.INTEGER(),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        nome_fornecedor: {
            type: DataTypes.CHAR(45),
            allowNull: false,
        },
        cnpj: {
            type: DataTypes.CHAR(20),
            allowNull: false
        },
        endereco: {
            type: DataTypes.CHAR(45),
            allowNull: false
        },
        representante: {
            type: DataTypes.CHAR(15),
            allowNull: false
        },
        telefone_fornecedor: {
            type: DataTypes.CHAR(15),
            allowNull: false
        },
        telefone_respresentante: {
            type: DataTypes.CHAR(15),
            allowNull: false
        },
        fk_fornecedor_produto: {
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
    return tbl_fornecedores
}