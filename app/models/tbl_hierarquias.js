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
        allowNull: false,
        unique: {
          msg: 'Esta hierarquia já está cadastrada.'
        },
        validate: {
          notNull: {
            msg: 'Campo nome é obrigátorio.'
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
        allowNull: true
      }
    })

  tbl_hierarquias.associate = function (models) {
    tbl_hierarquias.hasMany(models.tbl_usuarios, {
      foreignKey: 'fk_usuario_hierarquia',
      targetKey: 'id_hierarquia'
    })
  }
  return tbl_hierarquias
}