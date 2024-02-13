const Paciente = require('../models/Paciente')
// const bcrypt = require('bcrypt')

const getPaciente = async (req, res) => {
    const { id } = req.params
    console.log('\n PACIENTE', req.params)
    try {
        const paciente = await Paciente.findByPk(id)
        if (!paciente) {
            console.error(`Paciente ID ${id} não encontrado`)
            return res
                .status(404)
                .json({ message: `Paciente ID ${id} não encontrado` })
        }
        return res.json(paciente)
    } catch (error) {
        console.error('Error /@getPaciente:', error)
        return res.status(500).json({ error: 'Internal server error' })
    }
}

const getAllPacientes = async (req, res) => {
    try {
        const pacientes = await Paciente.findAll()
        return res.json(pacientes)
    } catch (error) {
        console.error('Error /@getAllPacientes:', error)
        return res.status(500).json({ error: 'Internal server error' })
    }
}

const createPaciente = async (req, res) => {
    try {
        // TODO: Input validation aqui (Joi, express-validator, ou outro)
        const {
            nome,
            nomeSocial,
            genero,
            email,
            telefone,
            cpf,
            dataNasc,
            cep,
            numero,
            complemento,
            rua,
            bairro,
            cidade,
            uf
        } = req.body

        const newPaciente = await Paciente.create({
            nome,
            nomeSocial,
            genero,
            email,
            telefone,
            cpf,
            dataNasc,
            cep,
            numero,
            complemento,
            rua,
            bairro,
            cidade,
            uf
        })

        console.log('\nPACIENTE REGISTRADO: \n', newPaciente)
        return res.json(newPaciente)
    } catch (error) {
        if (error.name && error.parent.code == 'ER_DUP_ENTRY') {
            return res.status(409).json({ message: 'CPF ou Email já existem.' })
        }
        console.error('\nError @createPaciente: \n', error)
        return res.sendStatus(500)
    }
}

const updatePaciente = async (req, res) => {
    const {
        idSame,
        prateleira,
        nome,
        nomeSocial,
        email,
        genero,
        cpf,
        telefone,
        dataNasc,
        cep,
        uf,
        rua,
        bairro,
        cidade,
        numero,
        complemento,
    } = req.body
    try {
        const paciente = await Paciente.findByPk(idSame)
        console.log('PACIENTE ENCONTRADO UPDATE: ', paciente)
        if (!paciente) {
            console.error(`Paciente ID ${idSame} não encontrado`)
            return res
                .status(404)
                .json({ message: `Paciente ID ${idSame} não encontrado` })
        }

        const updatedFields = {}

        if (nome && paciente.nome !== nome) updatedFields.nome = nome
        if (nomeSocial && paciente.nomeSocial !== nomeSocial)
            updatedFields.nomeSocial = nomeSocial
        if (prateleira && paciente.prateleira !== prateleira)
            updatedFields.prateleira = prateleira
        if (email && paciente.email !== email) updatedFields.email = email
        if (genero && paciente.genero !== genero) updatedFields.genero = genero
        if (cpf && paciente.cpf !== cpf) updatedFields.cpf = cpf
        if (telefone && paciente.telefone !== telefone)
            updatedFields.telefone = telefone
        if (dataNasc && paciente.dataNasc !== dataNasc)
            updatedFields.dataNasc = dataNasc
        if (cep && paciente.cep !== cep) updatedFields.cep = cep
        if (uf && paciente.uf !== uf) updatedFields.uf = uf
        if (rua && paciente.rua !== rua) updatedFields.rua = rua
        if (bairro && paciente.bairro !== bairro) updatedFields.bairro = bairro
        if (cidade && paciente.cidade !== cidade) updatedFields.cidade = cidade
        if (numero && paciente.numero !== numero) updatedFields.numero = numero
        if (complemento && paciente.complemento !== complemento)
            updatedFields.complemento = complemento

        if (Object.keys(updatedFields).length > 0) {
            await paciente.update(updatedFields)
        }

        return res.json({ success: true, data: paciente })
    } catch (error) {
        console.error('Error /@updatePaciente:', error)
        return res.status(500).json({ error: 'Internal server error' })
    }
}

// TODO:
const deletePaciente = async (req, res) => {
    try {
        const idSame = req.body.idSame
        const paciente = await Paciente.findByPk(idSame)
        console.log(paciente)
        if (!idSame)
            return res
                .status(400)
                .json({ 'message': 'ID de Usuário Não Encontrado.' })
        if (!paciente) {
            console.error(`Paciente ID ${idSame} não encontrado`)
            return res
                .status(400)
                .json({ message: `Paciente idSame ${idSame} não encontrado` })
        }
        await paciente.destroy()
        res.json({ message: `Paciente ID ${idSame} foi deletado com sucesso!` })
    } catch (error) {
        console.error('Error /@deletePaciente:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
}

module.exports = {
    getAllPacientes,
    createPaciente,
    updatePaciente,
    deletePaciente,
    getPaciente,
}
