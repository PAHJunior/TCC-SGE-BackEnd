module.exports = function (sequelize, DataTypes) {
  const tbl_estoques = sequelize.define('tbl_estoques', {
    id_estoque: {
      type: DataTypes.INTEGER(),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nome_estoque: {
      type: DataTypes.CHAR(50),
      allowNull: false,
      unique: true,
    },
    estoque_seguranca: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },
    quantidade_total: {
      type: DataTypes.INTEGER(),
      defaultValue: 0,
      allowNull: false
    },
    ativo: {
      type: DataTypes.BOOLEAN(),
      defaultValue: true,
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
  return tbl_estoques
}