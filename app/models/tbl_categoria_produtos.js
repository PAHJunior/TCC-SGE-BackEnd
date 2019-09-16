module.exports = function (sequelize, DataTypes) {
  const tbl_categoria_produtos = sequelize.define('tbl_categoria_produtos', {
    id_categoria_produto: {
      type: DataTypes.INTEGER(),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.CHAR(45),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Campo nome obrigatório '
        }
      }
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
  return tbl_categoria_produtos
}