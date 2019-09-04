module.exports = function (sequelize, DataTypes) {
  const tbl_enderecos = sequelize.define('tbl_enderecos', {
    id_endereco: {
      type: DataTypes.INTEGER(),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    cep: {
      type: DataTypes.CHAR(12),
      allowNull: false
    },
    logradouro: {
      type: DataTypes.CHAR(100),
      allowNull: true,
    },
    complemento: {
      type: DataTypes.CHAR(100)
    },
    bairro: {
      type: DataTypes.CHAR(50),
      allowNull: false,
      unique: true,
    },
    numero: {
      type: DataTypes.CHAR(10),
      allowNull: false,
    },
    cidade: {
      type: DataTypes.CHAR(50),
      allowNull: false
    },
    uf: {
      type: DataTypes.CHAR(2),
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
  tbl_enderecos.associate = function (models) {
    tbl_enderecos.hasMany(models.tbl_usuarios, {
      foreignKey: 'fk_usuario_endereco',
      targetKey: 'id_endereco'
    })
  }
  return tbl_enderecos
}