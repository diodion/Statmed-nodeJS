const Usuario = require("../models/Usuario")

// /logout
const handleLogout = async (req, res) => {
    const cookies = req.cookies
    // console.log("\n COOKIES ENCONTRADO: @7 @logoutController: ", cookies)
    if (!cookies?.refresh_token) return res.sendStatus(204) //Sem conteudo
    const refresh_token = cookies.refresh_token
    console.log("\n refresh_token ENCONTRADO: @10 @logoutController: ", refresh_token)

    // Comparando refresh_token no db
    const foundUser = await Usuario.findOne({ where: { refresh_token } })
    if (!foundUser) {
        console.log("\n Usuário Não Encontrado. @logoutController @14")
        res.clearCookie("jwt", {
            httpOnly: true,
            sameSite: "strict", //Deixar exatamente igual do authController
            secure: true,
        })
        return res.sendStatus(204)
    }
    // console.log("\n USUARIO ENCONTRADO: @17 @logoutController: ", foundUser)

    // Deletar refresh_token do db
    foundUser.refresh_token = ""
    await foundUser.save()

    // Limpar cookies do browser. Deixar samesite igual authController
    res.clearCookie("jwt", { httpOnly: true, sameSite: "strict", secure: true })
    console.log(`\n USUARIO DESLOGADO COM SUCESSO: \n 
    Usuario: ${foundUser.usuario}`)
    res.sendStatus(204)
}

module.exports = { handleLogout }
