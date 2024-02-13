const express = require('express')
const router = express.Router()
const { updateAnamnese } = require('../../controllers/atendimentoController')

router.route('/').put(updateAnamnese)

module.exports = router
