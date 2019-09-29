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
      unique: {
        msg: 'Essa categoria já foi cadastrada.'
      },
      validate: {
        notNull: {
          msg: 'Campo nome é obrigatório.'
        }
      }
    },
    descricao: {
      type: DataTypes.CHAR(150),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Campo descrição é obrigatório.'
        }
      }
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
  tbl_categoria_produtos.associate = function (models) {
    tbl_categoria_produtos.hasMany(models.tbl_grupo_produtos, {
      foreignKey: 'fk_categoria_produto',
      targetKey: 'id_grupo_produto'
    });
    tbl_categoria_produtos.hasMany(models.tbl_produtos, {
      foreignKey: 'fk_produto_categoria',
      targetKey: 'id_categoria_produto'
    });
  }
  return tbl_categoria_produtos
}