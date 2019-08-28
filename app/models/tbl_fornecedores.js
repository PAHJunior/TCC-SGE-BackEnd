module.exports = function (sequelize, DataTypes) {
    const tbl_fornecedores = sequelize.define('tbl_fornecedores', {
        id_fornecedor: {
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
        nome_fornecedor: {
            type: DataTypes.CHAR(45),
            allowNull: false,
        },
        cnpj: {
            type: DataTypes.CHAR(20),
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
        email_representante: {
            type: DataTypes.CHAR(150),
            allowNull: false
        },
        fk_fornecedor_endereco: {
            type: DataTypes.INTEGER(),
            references: {
                model: 'tbl_enderecos',
                key: 'id_endereco'
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