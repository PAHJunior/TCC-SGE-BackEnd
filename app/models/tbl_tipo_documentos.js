module.exports = function (sequelize, DataTypes) {
  const tbl_tipo_documentos = sequelize.define('tbl_tipo_documentos',
    {
      id_tipo_documento: {
        type: DataTypes.INTEGER(),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      tipo_documento: {
        type: DataTypes.CHAR(20),
        allowNull: false
      },
      ativo: {
        type: DataTypes.BOOLEAN(),
        defaultValue: true,
        allowNull: false,
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

  tbl_tipo_documentos.associate = function (models) {
    tbl_tipo_documentos.hasMany(models.tbl_movimentacoes, {
      foreignKey: 'fk_tipo_documento',
      targetKey: 'id_tipo_documento'
    });
  }
  return tbl_tipo_documentos
}
