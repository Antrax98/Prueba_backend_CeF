const express = require('express')
const router = express.Router()

const {crearTemporada} = require('../controllers/temporadaController')


router.post('/crear', crearTemporada)

module.exports = router