const verifyCargos = (...allowedCargos) => {
    return (req, res, next) => {
        // console.log('\n@verifyCARGOS "TIPO DO ALLOWED CARGOS": ',allowedCargos,typeof allowedCargos)
        console.log('\n@verifyCARGOS: "CARGOS REQ" =', req.usuario, typeof req.usuario)
        // console.log('\n@verifyCARGOS 2222222222: "REQ INTEIRA" =', req)       

        if (!req?.cargos) {
            console.error('\n!!! @verifyCARGOS SEM CARGOS NA REQ')
            return res.sendStatus(401)
        }

        const allowedCargosArray = allowedCargos.map(Number)
        console.log(
            '\n@verifyCARGOS: "ALLOWED CARGOS ARRAY" =',
            allowedCargosArray,
            typeof allowedCargosArray,
        )

        // Checa se existe cargos no array, procura e retornar todos que forem encontrados.
        const autorizacao = allowedCargosArray.some(allowedCargo =>
            req.cargos.includes(allowedCargo),
        )

        console.log(
            'USUÁRIO AUTORIZADO @verifyCargos! ',
            autorizacao,
            typeof autorizacao,
        )
        next()
    }
}

module.exports = verifyCargos

// === TESTAR PERFORMANCE DEPOIS:
// const cargosArray = [].concat(req.cargos).map((cargo) => +cargo);
// const result = cargosArray.some((cargo) => allowedCargos.includes(cargo));
// const cargosArray = [...allowedCargos]
// const result = Array.isArray(req.cargos) ? req.cargos : [req.cargos]
