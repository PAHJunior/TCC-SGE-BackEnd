module.exports = function (sequelize, DataTypes) {
  const tbl_grupo_produtos = sequelize.define('tbl_grupo_produtos', {
    id_grupo_produto: {
      type: DataTypes.INTEGER(),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.CHAR(45),
      allowNull: false
    },
    descricao: {
      type: DataTypes.CHAR(150),
      allowNull: true,
    },
    ativo: {
      type: DataTypes.BOOLEAN(),
      defaultValue: true,
      allowNull: false
    },
    fk_categoria_produto: {
      type: DataTypes.INTEGER(),
      references: {
        model: 'tbl_categoria_produtos',
        key: 'id_categoria_produto'
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
  return tbl_grupo_produtos
}