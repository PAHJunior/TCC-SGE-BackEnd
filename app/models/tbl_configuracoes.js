module.exports = function (sequelize, DataTypes) {
  const tbl_configuracoes = sequelize.define('tbl_configuracoes', {
    id_configuracao: {
      type: DataTypes.INTEGER(),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    db_username: {
      type: DataTypes.CHAR(45),
      allowNull: false
    },
    db_pass: {
      type: DataTypes.CHAR(45),
      allowNull: true,
    },
    db_database: {
      type: DataTypes.CHAR(45),
      allowNull: false,
    },
    db_host: {
      type: DataTypes.CHAR(45),
      allowNull: false,
    },
    db_port: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      unique: true,
    },
    db_dialect: {
      type: DataTypes.CHAR(45),
      allowNull: false,
      unique: true,
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

  tbl_configuracoes.associate = function (models) {
    tbl_configuracoes.hasMany(models.tbl_empresas, {
      foreignKey: 'fk_empresa_configuracao',
      targetKey: 'id_configuracao'
    })
  }
  return tbl_configuracoes
}