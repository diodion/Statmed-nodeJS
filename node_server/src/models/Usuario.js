const { DataTypes } = require("sequelize")
const sequelize = require("../database/connection").sequelize

const Usuario = sequelize.define(
    "Usuario",
    {
        id_user: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        cpf: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        crm: {
            type: DataTypes.STRING,
        },
        usuario: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        senha_hash: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        data_nasc: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        id_cargo: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        refresh_token: {
            type: DataTypes.STRING,
            field: "refresh_token",
            allowNull: true,
        },
    },
    {
        tableName: "Usuario", // Specify the actual table name here
        timestamps: false, // Disable timestamps feature
    },
)

module.exports = Usuario
