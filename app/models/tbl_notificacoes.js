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
      type: DataTypes.INTEGER(),
      references: {
        model: 'tbl_usuarios',
        key: 'id_usuario'
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
  }
  return tbl_notificacoes
}