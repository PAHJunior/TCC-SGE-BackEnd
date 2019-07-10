module.exports = function (sequelize, DataTypes) {
    const tbl_usuarios = sequelize.define('tbl_usuarios', {
        id_usuario: {
            type: DataTypes.INTEGER(),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        nome: {
            type: DataTypes.CHAR(100),
            allowNull: false
        },
        email: {
            type: DataTypes.CHAR(100),
            allowNull: false
        },
        login: {
            type: DataTypes.CHAR(45),
            allowNull: false
        },
        senha: {
            type: DataTypes.CHAR(45),
            allowNull: false
        },
        hierarquia: {
            type: DataTypes.CHAR(3),
            allowNull: false
        },
        fk_usuario_setor: {
            type: DataTypes.INTEGER(),
            references: {
                model: 'tbl_setores',
                key: 'id_setor'
            }
        },
        fk_usuario_empresa: {
            type: DataTypes.INTEGER(),
            references: {
                model: 'tbl_empresas',
                key: 'id_empresa'
            }
        },
        fk_usuario_estoque: {
            type: DataTypes.INTEGER(),
            references: {
                model: 'tbl_estoques',
                key: 'id_estoque'
            }
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW()
        },
        updatedAt: {
            type: DataTypes.DATE,
        }
    })
    return tbl_usuarios
}