module.exports = function (sequelize, DataTypes) {
  const tbl_meses = sequelize.define('tbl_meses',
    {
      id_meses: {
        type: DataTypes.INTEGER(),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      meses: {
        type: DataTypes.CHAR(20),
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
    })

    tbl_meses.associate = function (models) {
      tbl_meses.hasMany(models.tbl_movimentacoes, {
        foreignKey: 'fk_meses',
        targetKey: 'id_meses'
      });
    }
  return tbl_meses
}
