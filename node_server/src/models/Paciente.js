const { DataTypes } = require('sequelize')
const sequelize = require('../database/connection').sequelize
// const Atendimento = require('./Atendimento')

const Paciente = sequelize.define(
    'Paciente',
    {
        idSame: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nomeSocial: {
            type: DataTypes.STRING,
        },
        genero: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
        cpf: {
            type: DataTypes.STRING,
        },
        telefone: {
            type: DataTypes.STRING,
        },
        dataNasc: {
            type: DataTypes.DATEONLY,
        },
        cep: {
            type: DataTypes.STRING,
        },
        uf: {
            type: DataTypes.STRING,
        },
        rua: {
            type: DataTypes.STRING,
        },
        bairro: {
            type: DataTypes.STRING,
        },
        cidade: {
            type: DataTypes.STRING,
        },
        complemento: {
            type: DataTypes.STRING,
        },
        numero: {
            type: DataTypes.INTEGER,
        },
        prateleira: {
            type: DataTypes.STRING,
        },
    },
    {
        tableName: 'Paciente', // Specify the actual table name here
        timestamps: false, // Disable timestamps feature
    },
)

// Paciente.hasMany(Atendimento, {
//     foreignKey: 'pacienteIdSame',
//     onDelete: 'CASCADE',
// })

module.exports = Paciente
