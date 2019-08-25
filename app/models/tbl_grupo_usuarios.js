module.exports = function (sequelize, DataTypes) {
  const tbl_grupo_usuarios = sequelize.define('tbl_grupo_usuarios',
    {
      id_grupo: {
        type: DataTypes.INTEGER(),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      nome: {
        type: DataTypes.CHAR(30),
        allowNull: false
      },
      ativo: {
        type: DataTypes.BOOLEAN(),
        defaultValue: true,
        allowNull: false,
      },
      fk_usuario: {
        type: DataTypes.INTEGER(),
        references: {
          model: 'tbl_usuarios',
          key: 'id_usuario'
        }
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
  return tbl_grupo_usuarios
}