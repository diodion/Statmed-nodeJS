require('dotenv').config()
const Usuario = require('../models/Usuario')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// /registro
const loginUser = async (req, res, next) => {
    const { usuario, senha } = req.body
    try {
        //caso der error, remover raw true. isso é teste de performance
        const login1 = await Usuario.findOne({ where: { usuario } })

        if (!login1) {
            return res.status(401).json({ message: 'Usuário não existe' })
        }

        const senhaVerificacao = await bcrypt.compare(senha, login1.senha_hash)

        if (!senhaVerificacao) {
            return res.status(401).json({ message: 'Credenciais inválidas' })
        }

        // Criando cookie token e id_cargos
        const token = jwt.sign(
            {
                'UserInfo': {
                    'usuario': login1.usuario,
                    // Checando se é apenas 1000 ou array [1000, 1001]:
                    'cargos': login1.id_cargo,
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN },
        )
        // const token2 = parseInt(login1.id_cargo)
        // console.log('\n+++ TOKEN CRIADO: ', token2)

        // Criando refresh token
        const refresh_token = jwt.sign(
            {
                'usuario': login1.usuario,
            },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN },
        )
        console.log('\n+++ REFRESH TOKEN CRIADO: ', refresh_token)

        // Setando o JWT token como cookie
        res.cookie('jwt', token, {
            httpOnly: true,
            sameSite: 'strict', // Ajustar de acordo com as configs Frontend
            secure: true,
            maxAge:
                parseInt(process.env.COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000,
        })

        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            sameSite: 'strict', // Ajustar de acordo com as configs Frontend
            secure: true,
            maxAge:
                parseInt(process.env.COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000,
        })

        // Salvando refresh_token com usuario atual no db
        login1.refresh_token = refresh_token
        await login1.save()

        // Limpando informação sensível e da memória:
        login1.senha_hash = null

        const response = { login1 }

        return res.status(200).json({ response })
    } catch (error) {
        console.error('\nError /login: ', error)
        return res.sendStatus(500)
    }
}

module.exports = { loginUser }
