const Usuario = require('../models/Usuario')
const jwt = require('jsonwebtoken')
require('dotenv').config()

// /refresh
const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies
    // console.log("\n +++ cookies @ refreshTokenController (@ 7) \n  ", cookies)

    if (!cookies?.refresh_token) {
        // console.log("\n SEM COOKIES @ refresh_tokenController (@ 10): !! 401 !!")
        return res.sendStatus(401) // Unauthorized, token não existe
    }

    const refresh_token = cookies.refresh_token
    // console.log(refresh_token)
    const foundUser = await Usuario.findOne({
        where: { refresh_token },
    })
    // console.log("\n +++ USUARIO @ refresh_tokenController (@ 21) \n) : ", foundUser.nome)
    if (!foundUser) {
        return res.status(401).json({ message: 'Usuário não existe' })
    }

    try {
        const decoded = jwt.verify(
            refresh_token,
            process.env.REFRESH_TOKEN_SECRET,
        )
        // console.log("\n +++ DECODED @ refresh_tokenController (@ 26) \n ", decoded)

        // Checando se o usuario Não dá match no db
        if (foundUser.dataValues.usuario !== decoded.usuario) {
            // console.log("\n +++ USUARIO NÃO ENCONTRADO @ refresh_tokenController (@ 28) \n
            return res.sendStatus(403)
        }

        // Gerando um novo accessToken e enviando como res
        const accessToken = jwt.sign(
            {
                'UserInfo': {
                    'usuario': decoded.usuario,
                    'cargos': Array.isArray(decoded.id_cargo)
                        ? decoded.id_cargo
                        : [decoded.id_cargo],
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '600s' },
        )
        console.log(`\n TOKEN ATUALIZADO COM SUCESSO: \n 
    Usuario: ${foundUser.usuario}:\n ${accessToken}`)

        const { nome, email, cpf, crm, data_nasc, id_cargo, usuario } =
            foundUser
        // delete foundUser

        res.json({
            accessToken,
            nome,
            email,
            cpf,
            crm,
            data_nasc,
            id_cargo,
            usuario,
        })
    } catch (err) {
        console.error('Invalid JSON format in refresh_token: ', err)
        return res.sendStatus(400) // Bad request
    }
}

module.exports = { handleRefreshToken }
