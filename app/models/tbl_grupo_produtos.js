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
      unique: {
        msg: 'Esse grupo já foi cadastrado.'
      },
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Campo nome é obrigátorio.'
        }
      }
    },
    descricao: {
      type: DataTypes.CHAR(150),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Campo descricao é obrigátorio.'
        }
      }
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

  tbl_grupo_produtos.associate = function (models) {
    tbl_grupo_produtos.hasMany(models.tbl_produtos, {
      foreignKey: 'fk_produto_grupo',
      targetKey: 'id_grupo_produto'
    });
    // A tabela atual Possui
    tbl_grupo_produtos.belongsTo(models.tbl_categoria_produtos,
      {
        foreignKey: 'fk_categoria_produto',
        targetKey: 'id_categoria_produto',
        as: 'categoria'
      });
  }

  return tbl_grupo_produtos
}