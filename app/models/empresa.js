module.exports = function (sequelize, DataTypes) {
    var tbl_empresa = sequelize.define('tbl_empresa', {
        id_empresa: {
            type: DataTypes.INTEGER(),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        razao_social: {
            type: DataTypes.CHAR(45),
        },
        nome_fantasia: {
            type: DataTypes.CHAR(25),
        },
        endereco: {
            type: DataTypes.CHAR(25),
        },
        telefone: {
            type: DataTypes.CHAR(15),
        },
        cnpj: {
            type: DataTypes.CHAR(20),
            unique: true,
        }
    })
    return tbl_empresa
  }