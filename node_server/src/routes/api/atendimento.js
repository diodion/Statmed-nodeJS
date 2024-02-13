const express = require('express')
const router = express.Router()
const pacientesController = require('../../controllers/atendimentoController')
// const CARGOS_LIST = require('../../config/cargos_list')
// const verifyCargos = require('../../middleware/verifyCargos')

// TODO: VER SOBRE AUTH PARA PACIENTES DPS
router
    .route('/') // <--- tudo /atendimento
    .get(pacientesController.getAllAtendimento)
    .post(pacientesController.createAtendimento)
    .put(pacientesController.updateAtendimento)
    .delete(pacientesController.deleteAtendimento)
router.route('/:id').get(pacientesController.getAtendimentoById)

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
