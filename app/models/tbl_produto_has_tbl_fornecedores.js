module.exports = function (sequelize, DataTypes) {
  const tbl_produto_has_tbl_fornecedores = sequelize.define('tbl_produto_has_tbl_fornecedores', {
    id_categoria_produto: {
      type: DataTypes.INTEGER(),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    tbl_produto_id_produto: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      references: {
        model: 'tbl_produtos',
        key: 'id_produto'
      }
    },
    tbl_fornecedor_id_fornecedor: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      references: {
        model: 'tbl_fornecedores',
        key: 'id_fornecedor'
      }
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
    }
  })
  return tbl_produto_has_tbl_fornecedores
}