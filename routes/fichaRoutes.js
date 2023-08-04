const express = require('express')
const router = express.Router()

const {crearFicha,fichaActual,usuariosSinFichaEnTemporada} = require('../controllers/fichaController')


router.post('/crear', crearFicha)

router.get('/fichaActual',fichaActual)

router.get('/usuariosSinFichaEnTemporada/:temporada', usuariosSinFichaEnTemporada)

module.exports = router