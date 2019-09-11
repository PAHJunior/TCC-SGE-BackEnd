module.exports = function (sequelize, DataTypes) {
    const tbl_representantes = sequelize.define('tbl_representantes', {
        id_representante: {
            type: DataTypes.INTEGER(),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataTypes.CHAR(100),
            allowNull: false,
        },
        email: {
            type: DataTypes.CHAR(100),
            allowNull: false
        },
        telefone: {
            type: DataTypes.CHAR(15),
            allowNull: false
        },
        ativo: {
            type: DataTypes.BOOLEAN(),
            defaultValue: true,
            allowNull: false
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
    tbl_representantes.associate = function (models) {
        tbl_representantes.hasMany(models.tbl_fornecedores, {
          foreignKey: 'fk_fornecedor_representante',
          targetKey: 'id_representante'
        });
      }
    return tbl_representantes
}