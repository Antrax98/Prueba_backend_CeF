const express = require('express')
const router = express.Router()

const {crearTemporada,tempoActFut,obtenerTemporadas} = require('../controllers/temporadaController')


router.post('/crear', crearTemporada)
router.get('/obtActFut', tempoActFut)
router.get('/obtener',obtenerTemporadas)

module.exports = router