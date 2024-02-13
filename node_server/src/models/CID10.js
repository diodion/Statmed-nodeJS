const { DataTypes } = require("sequelize")
const sequelize = require("../database/connection").sequelize // Assuming your sequelize instance is exported from sequelize.js

const CID10 = sequelize.define(
    "CID10",
    {
        idCid: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        descr: {
            type: DataTypes.STRING,
        },
    },
    {
        tableName: "CID10", // Specify the actual table name here
        timestamps: false, // Disable timestamps feature
    },
)

module.exports = CID10