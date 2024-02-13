const Usuario = require('../models/Usuario')
const bcrypt = require('bcrypt')

const registroNovoUsuario = async (req, res) => {
    const { nome, email, cpf, crm, usuario, data_nasc, id_cargo, senha } =
        req.body
    // console.log('\n REQ BODY @6 @registroController', req.body)
    if (!usuario || !senha)
        return res
            .status(400)
            .json({ message: 'Por favor, informe o Usuário e Senha.' })
    // checando se já existe no db para não duplicar
    try {
        const usuarioExists = await Usuario.findOne({ where: { usuario } })
        if (usuarioExists)
            return res.sendStatus(409).json({ message: 'Usuário já existe.' }) //Conflict
        //encrypt password
        const hashedSenha = await bcrypt.hash(senha, 10)

        // Ensure that id_cargo is an array
        let id_cargoArray = []
        if (Array.isArray(id_cargo)) {
            id_cargoArray = id_cargo
        } else {
            id_cargoArray = [id_cargo]
        }

        // Add '1000' to the beginning of the id_cargo array (if not already present)
        if (!id_cargoArray.includes(1000)) {
            id_cargoArray.unshift(1000)
        }

        // Convert the array back to a string with comma-separated values
        const formattedIdCargo = id_cargoArray.join(',')

        //store the new user
        const novoUsuario = await Usuario.create({
            nome,
            email,
            cpf,
            crm,
            usuario,
            data_nasc,
            id_cargo: formattedIdCargo,
            senha_hash: hashedSenha,
        })
        res.status(201).json({
            success: 'Usuário criado com sucesso:',
            novoUsuario,
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
        console.log('\nError /@registroController: ', err)
    }
}

module.exports = { registroNovoUsuario }