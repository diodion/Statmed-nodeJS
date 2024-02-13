const sequelize = require("../database/connection").sequelize
const Paciente = require("../models/Paciente")
const Atendimento = require("../models/Atendimento")

// /histhospitalare
const getHistHospitalar = async (req, res) => {
    try {
        const results = await Atendimento.findAll({
            attributes: [
                "idAtendimento",
                "cid",
                "epidemia",
                [
                    sequelize.fn(
                        "DATE_FORMAT",
                        sequelize.col("data"),
                        "%d/%m/%Y",
                    ),
                    "data",
                ],
            ],
            include: [
                {
                    model: Paciente,
                    attributes: [
                        "idSame",
                        "nome",
                        [
                            sequelize.fn(
                                "DATE_FORMAT",
                                sequelize.col("dataNasc"),
                                "%d/%m/%Y",
                            ),
                            "dataNasc",
                        ],
                        "cpf",
                    ],
                },
            ],
        })

        const data = results.map(result => ({
            idAtendimento: result.idAtendimento,
            cid: result.cid ? result.cid : "",
            epidemia: result.epidemia,
            data: result.data,
            idSame: result.Paciente.idSame,
            nome: result.Paciente.nome,
            dataNasc: result.Paciente.dataNasc,
            cpf: result.Paciente.cpf,
            passagem: result.data,
        }))
        res.json(data)
    } catch (error) {
        console.error("\nError /histhospitalar:", error)
        res.status(500).json({ error: "Internal server error" })
    }
}

module.exports = { getHistHospitalar }
