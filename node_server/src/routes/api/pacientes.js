const express = require('express')
const router = express.Router()
const pacientesController = require('../../controllers/pacientesController')
// const CARGOS_LIST = require('../../config/cargos_list')
// const verifyCargos = require('../../middleware/verifyCargos')

// TODO: VER SOBRE AUTH PARA PACIENTES DPS
router
    .route('/') // <--- tudo /pacientes
    .get(pacientesController.getAllPacientes)
    .post(pacientesController.createPaciente)
    .put(pacientesController.updatePaciente)
    .delete(pacientesController.deletePaciente)
router.route('/:id').get(pacientesController.getPaciente)

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
