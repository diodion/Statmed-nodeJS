const express = require('express')
const router = express.Router()
const { updateReceita } = require('../../controllers/atendimentoController')

router.route('/').put(updateReceita)

module.exports = router
