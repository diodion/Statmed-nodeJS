require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const verifyJWT = require('./middleware/verifyJWT')
const cookieParser = require('cookie-parser')
const credentials = require('./middleware/credentials')
const corsOptions = require('./config/corsOptions')
const { getCID10 } = require('./controllers/cid10Controller')
const { getHistHospitalar } = require('./controllers/hospitalarController')
// const { getAtendimento } = require('./controllers/atendimentoController')

// Sequelize Models & Sync
const Paciente = require('./models/Paciente')
const Atendimento = require('./models/Atendimento')
const CID10 = require('./models/CID10')

Paciente.sync()
Atendimento.sync()
CID10.sync()

const port = 3001
app.use(credentials)
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())

app.use('/registro', require('./routes/registro'))
app.use('/login', require('./routes/auth'))
app.use('/refresh', require('./routes/refresh'))
app.use('/logout', require('./routes/logout'))
app.get('/cid10', getCID10)
app.get('/histhospitalar', getHistHospitalar)
// app.get('/histatendimento', getAtendimento)

app.use('/pacientes', require('./routes/api/pacientes'))
app.use('/atendimento', require('./routes/api/atendimento'))
app.use('/anamnese', require('./routes/api/anamneseRoutes'));
app.use('/relatorio', require('./routes/api/relatorioRoutes'));
app.use('/atestado', require('./routes/api/atestadoRoutes'));
app.use('/encaminhamento', require('./routes/api/encaminhamentoRoutes'));
app.use('/receita', require('./routes/api/receitaRoutes'));
app.use(verifyJWT)
app.use('/usuarios', require('./routes/api/usuarios'))

app.listen(port, () => {
    console.log(`=== Server is running on port ${port} ===`)
})

// DESCOMENTAR QUANDO TIVER LIVE. ISSO OTIMIZA QUERY MAS EM MODO DEV ABUSA DEMAIS NA CONSULTA
// sequelize.sync().then(() => {
//     app.listen(port, () => {
//         console.log(`=== Server is running on port ${port} ===`)
//     })
// })

// ======== SE TRAVAR, TENTAR:
// const sequelize = require("./database/connection").sequelize

// const bodyParser = require("body-parser")
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))
// const { db } = require("./database/connection")
// const loginUser = require("./controllers/authControllers")

// TODO: Ver certinho depois quais CORS reamente podem ser autorizadas no deploy.
// const url_frontend = process.env.FRONT_URL_DEV
// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", url_frontend)
//     res.setHeader("Access-Control-Allow-Credentials", true)
//     res.setHeader(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept, Authorization",
//     )
//     next()
// })
