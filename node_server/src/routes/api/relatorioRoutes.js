const express = require('express')
const router = express.Router()
const { updateRelatorio } = require('../../controllers/atendimentoController')

router.route('/').put(updateRelatorio)

module.exports = router
