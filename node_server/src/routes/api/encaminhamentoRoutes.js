const express = require('express')
const router = express.Router()
const {
    updateEncaminhamento,
} = require('../../controllers/atendimentoController')

router.route('/').put(updateEncaminhamento)

module.exports = router
