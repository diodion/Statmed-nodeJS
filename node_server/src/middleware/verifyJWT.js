require('dotenv').config()
const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
    console.log('\n @verifyJWT REQ COOKIES: ', req.cookies)
    const tokenData = req.cookies.jwt
    // req.headers.authorization.split(' ')[1]
    console.log('\n @verifyJWT TOKEN DATA: ', tokenData)
    if (!tokenData) {
        // Handle the case when tokenData is undefined
        console.log('\n @verifyJWT: SEM tokenData', tokenData)
        return res.sendStatus(401) // Unauthorized, token not provided
    }
    
    try {
        jwt.verify(
            tokenData,
            process.env.ACCESS_TOKEN_SECRET,
            (err, decoded) => {
                if (err) {
                    console.log('\n @verifyJWT ERRO: !!!!!', err)
                    return res.send(err)
                }
                // console.log('\n DECODED +++ : ', decoded.UserInfo)
                req.usuario = decoded.UserInfo.usuario
                req.cargos = decoded.UserInfo.cargos
                console.log(
                    // '\n @verifyJWT SUCESSO!!\n req.USUARIO: ',
                    req.usuario,
                )
                // console.log('@verifyJWT req.CARGOS: ', req.cargos)

                next()
            },
        )
    } catch (err) {
        // Handle the case when tokenData is not a valid JWT string
        console.error(
            '\n @verifyJWT CATCH ERR: Invalid JWT format in tokenData:',
            err,
        )
        return res.sendStatus(400) // Bad request
    }
}

module.exports = verifyJWT
