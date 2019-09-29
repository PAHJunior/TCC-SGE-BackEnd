module.exports = function (sequelize, DataTypes) {
  const tbl_unid_medidas = sequelize.define('tbl_unid_medidas', {
    id_unid_medida: {
      type: DataTypes.INTEGER(),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.CHAR(45),
      allowNull: false,
      unique: {
        msg: 'Esse grupo já foi cadastrado.'
      },
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
      allowNull: false,
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
  tbl_unid_medidas.associate = function (models) {
    tbl_unid_medidas.hasMany(models.tbl_usuarios, {
      foreignKey: 'fk_produto_unid_medida',
      targetKey: 'id_unid_medida'
    });
  }
  return tbl_unid_medidas
}