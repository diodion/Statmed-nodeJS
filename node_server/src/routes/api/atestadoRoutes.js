const express = require('express')
const router = express.Router()
const { updateAtestado } = require('../../controllers/atendimentoController')

router.route('/').put(updateAtestado)

module.exports = router
