module.exports = function (sequelize, DataTypes) {
    const tbl_empresas = sequelize.define('tbl_empresa', {
        id_empresa: {
            type: DataTypes.INTEGER(),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        razao_social: {
            type: DataTypes.CHAR(45),
            allowNull: false
        },
        nome_fantasia: {
            type: DataTypes.CHAR(25),
            allowNull: true,
        },
        endereco: {
            type: DataTypes.CHAR(25),
            allowNull: false,
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
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW()
        },
        updatedAt: {
            type: DataTypes.DATE,
        }
    })
    return tbl_empresas
  }