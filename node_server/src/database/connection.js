// ----------------------- SEQUELIZE -----------------------------------------
const { Sequelize } = require("sequelize")
require("dotenv").config()

const sequelize = new Sequelize(
    process.env.DBDATABASE,
    process.env.DBUSER,
    process.env.DBPASS,
    {
        host: process.env.DBHOST,
        dialect: process.env.DBDIALECT,
        operatorsAliases: false,
        pool: {
            max: process.env.DBPOOL_MAX,
            min: process.env.DBPOOL_MIN,
            acquire: process.env.DBPOOL_ACQUIRE,
            idle: process.env.DBPOOL_IDLE,
        },
    },
)

const db = {}

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db

// ----------------------- MYSQL2 BACKUP -----------------------------------------

// const mysql = require("mysql2/promise")
// require("dotenv").config()

// async function connect() {
//   if (global.connection && global.connection.state !== "disconnected") {
//     return global.connection
//   }

//   try {
//     const db = await mysql.createConnection({
//       user: process.env.DBUSER,
//       host: process.env.DBHOST,
//       password: process.env.DBPASS,
//       database: process.env.DBDATABASE,
//     })

//     // console.log("============= CONEXÃO FEITA =================")
//     return db
//   } catch (error) {
//     console.error("Error connecting to the database:", error)
//   }
// }

// connect()
// // selectCostumers()
// // const Sequelize = require('sequelize')

// module.exports = { connect }
