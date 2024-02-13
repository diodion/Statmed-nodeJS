const Usuario = require('../models/Usuario')
const bcrypt = require('bcrypt')

const getUsuario = async (req, res) => {
    const { id } = req.params
    try {
        const usuario = await Usuario.findByPk(id)
        if (!usuario) {
            console.error(`Usuario ID ${id} não encontrado`)
            return res
                .status(404)
                .json({ message: `Usuario ID ${id} não encontrado` })
        }
        return res.json(usuario)
    } catch (error) {
        console.error('Error /@getUsuario:', error)
        return res.status(500).json({ error: 'Internal server error' })
    }
}

const getAllUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll()
        return res.json(usuarios)
    } catch (error) {
        console.error('Error /@getAllUsuarios:', error)
        return res.status(500).json({ error: 'Internal server error' })
    }
}

// Apenas pro caso de precisar de um usuario diferente no DB.
const createUsuario = (req, res) => {
    console.log('CHEGOU EM CREATE USUARIO')
    return res.json({ message: 'CHEGOU EM CREATE USUARIO' })
}

const updateUsuario = async (req, res) => {
    const { id_user, nome, email, cpf, crm, usuario, data_nasc, id_cargo } =
        req.body
    try {
        const usuarioInstance = await Usuario.findByPk(id_user)
        if (!usuarioInstance) {
            console.error(`Usuario ID ${id_user} não encontrado`)
            return res
                .status(404)
                .json({ message: `Usuario ID ${id_user} não encontrado` })
        }

        const updatedFields = {}

        if (nome && usuarioInstance.nome !== nome) updatedFields.nome = nome
        if (email && usuarioInstance.email !== email)
            updatedFields.email = email
        if (cpf && usuarioInstance.cpf !== cpf) updatedFields.cpf = cpf
        if (crm && usuarioInstance.crm !== crm) updatedFields.crm = crm
        if (usuario && usuarioInstance.usuario !== usuario)
            updatedFields.usuario = usuario
        if (data_nasc && usuarioInstance.data_nasc !== data_nasc)
            updatedFields.data_nasc = data_nasc
        if (id_cargo && usuarioInstance.id_cargo !== id_cargo)
            updatedFields.id_cargo = id_cargo

        // If there are updated fields, update the usuario record in the database
        if (Object.keys(updatedFields).length > 0) {
            await usuarioInstance.update(updatedFields)
        }

        return res.json({ success: true, data: usuarioInstance })
    } catch (error) {
        console.error('Error /@updateUsuario:', error)
        return res.status(500).json({ error: 'Internal server error' })
    }
}

// TODO:
const deleteUsuario = async (req, res) => {
    try {
        const id_user = req.body.id_user
        const usuario = await Usuario.findByPk(id_user)
        if (!id_user)
            return res
                .status(400)
                .json({ 'message': 'ID de Usuário Não Encontrado.' })
        if (!usuario) {
            console.error(`Usuario ID ${id_user} não encontrado`)
            return res
                .status(400)
                .json({ message: `Usuario id_user ${id_user} não encontrado` })
        }
        await usuario.destroy()
        res.json({ message: `Usuario ID ${id_user} foi deletado com sucesso!` })
    } catch (error) {
        console.error('Error /@deleteUsuario:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
}

module.exports = {
    getAllUsuarios,
    createUsuario,
    updateUsuario,
    deleteUsuario,
    getUsuario,
}
