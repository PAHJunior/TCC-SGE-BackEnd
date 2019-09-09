module.exports = function (sequelize, DataTypes) {
  const tbl_empresas = sequelize.define('tbl_empresas', {
    id_empresa: {
      type: DataTypes.INTEGER(),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    ativo: {
      type: DataTypes.BOOLEAN(),
      defaultValue: true,
      allowNull: false
    },
    razao_social: {
      type: DataTypes.CHAR(45),
      allowNull: false
    },
    nome_fantasia: {
      type: DataTypes.CHAR(25),
      allowNull: true,
    },
    telefone: {
      type: DataTypes.CHAR(15),
      allowNull: false,
    },
    cnpj: {
      type: DataTypes.CHAR(20),
      allowNull: false,
      unique: true,
    },
    segmento: {
      type: DataTypes.CHAR(20),
      allowNull: false,
      unique: true,
    },
    fk_empresa_configuracao: {
      type: DataTypes.INTEGER(),
      references: {
        model: 'tbl_configuracoes',
        key: 'id_configuracao'
      }
    },
    fk_empresa_endereco: {
      type: DataTypes.INTEGER(),
      references: {
        model: 'tbl_enderecos',
        key: 'id_endereco'
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
      type: DataTypes.DATE
    }
  })

  // Associações de FK
  tbl_empresas.associate = function (models) {

    // Possui
    tbl_empresas.belongsTo(models.tbl_configuracoes,
      {
        foreignKey: 'fk_empresa_configuracao',
        targetKey: 'id_configuracao',
        as: 'configuracao'
      });
    tbl_empresas.belongsTo(models.tbl_enderecos,
      {
        foreignKey: 'fk_empresa_endereco',
        targetKey: 'id_endereco',
        as: 'endereco'
      });

    // Tem tabelas que possui
    tbl_empresas.hasMany(models.tbl_estoques, {
      foreignKey: 'fk_estoque_empresa',
      targetKey: 'id_estoque'
    })
  }
  return tbl_empresas
}