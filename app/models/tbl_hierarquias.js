module.exports = function (sequelize, DataTypes) {
    const tbl_hierarquias = sequelize.define('tbl_hierarquias',
      {
        id_hierarquia: {
          type: DataTypes.INTEGER(),
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        nome: {
          type: DataTypes.CHAR(30),
          allowNull: false
        },
        ativo: {
          type: DataTypes.BOOLEAN(),
          defaultValue: true,
          allowNull: false,
        },
        versaroLocal: {
          type: DataTypes.INTEGER(),
          defaultValue: 0
        },
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW()
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: true
        }
      })
    return tbl_hierarquias
  }