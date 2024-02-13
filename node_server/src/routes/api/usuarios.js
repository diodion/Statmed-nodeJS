const express = require('express')
const router = express.Router()
const usuariosController = require('../../controllers/usuariosController')
const CARGOS_LIST = require('../../config/cargos_list')
const verifyCargos = require('../../middleware/verifyCargos')

// const verifyJWT = require('../../middleware/verifyJWT')
// router.use(verifyJWT)
router
    .route('/') //<-- /usuarios
    .get(verifyCargos(CARGOS_LIST.Usuario), usuariosController.getAllUsuarios)
    .post(verifyCargos(CARGOS_LIST.Usuario), usuariosController.createUsuario)
    .put(verifyCargos(CARGOS_LIST.Usuario), usuariosController.updateUsuario)
    .delete(verifyCargos(CARGOS_LIST.Usuario), usuariosController.deleteUsuario)
router.route('/:id').get(usuariosController.getUsuario)

module.exports = router

// verifyCargos(
// CARGOS_LIST.Usuario,
// CARGOS_LIST.Admin,
// CARGOS_LIST.Recepcionista,
// CARGOS_LIST.Medico,
// CARGOS_LIST.Enfermeiro,
// CARGOS_LIST.Gerente_Admin,
// CARGOS_LIST.Superuser,
// CARGOS_LIST.TI,
// ),
