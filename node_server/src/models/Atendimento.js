const { DataTypes } = require("sequelize")
const sequelize = require("../database/connection").sequelize
const Paciente = require("./Paciente") 
const CID10 = require("./CID10")

const Atendimento = sequelize.define(
    "Atendimento",
    {
        idAtendimento: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        cid: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Unknown",
            references: {
                model: CID10,
                key: "idCid",
            },
        },
        usuarioIdFunc: {
            type: DataTypes.STRING,
        },
        usuarioCRM: {
            type: DataTypes.STRING,
        },
        data: {
            type: DataTypes.DATEONLY,
        },

        epidemia: {
            type: DataTypes.STRING,
        },
        atestado: {
            type: DataTypes.STRING,
        },
        anamnese: {
            type: DataTypes.STRING,
        },
        relatorio: {
            type: DataTypes.STRING,
        },
        encaminhamento: {
            type: DataTypes.STRING,
        },
        receita: {
            type: DataTypes.STRING,
        },
        pacienteIdSame: {
            type: DataTypes.INTEGER,
            references: {
                model: Paciente,
                key: "IdSame",
            },
        },
    },
    {
        tableName: "Atendimento", // Specify the actual table name here
        timestamps: false, // Disable timestamps feature
    },
)

Paciente.hasMany(Atendimento, { onDelete: "CASCADE" });
Atendimento.belongsTo(Paciente, { foreignKey: "pacienteIdSame" });
Atendimento.belongsTo(CID10, { foreignKey: "cid", as: "CIDObj" }); 

module.exports = Atendimento