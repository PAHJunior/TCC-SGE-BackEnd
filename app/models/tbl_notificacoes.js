module.exports = function (sequelize, DataTypes) {
  const tbl_notificacoes = sequelize.define('tbl_notificacoes', {
    id_notificacao: {
      type: DataTypes.INTEGER(),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    descricao: {
      type: DataTypes.CHAR(100),
      allowNull: false
    },
    ativo: {
      type: DataTypes.BOOLEAN(),
      defaultValue: true,
      allowNull: false
    },
    fk_usuario: {
      allowNull: true,
      type: DataTypes.INTEGER(),
      references: {
        model: 'tbl_usuarios',
        key: 'id_usuario'
      }
    },
    fk_hierarquia: {
      allowNull: true,
      type: DataTypes.INTEGER(),
      references: {
        model: 'tbl_hierarquias',
        key: 'id_hierarquia'
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

  // Associando a tabela de usuario
  tbl_notificacoes.associate = function (models) {
    tbl_notificacoes.belongsTo(models.tbl_usuarios, {
      foreignKey: 'fk_usuario',
      targetKey: 'id_usuario',
      as: 'usuarios'
    });
    tbl_notificacoes.belongsTo(models.tbl_hierarquias, {
      foreignKey: 'fk_hierarquia',
      targetKey: 'id_hierarquia',
      as: 'hierarquia'
    });
  }
  return tbl_notificacoes
}