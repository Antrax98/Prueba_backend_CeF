const express = require('express')
const router = express.Router()

const {crearFicha,fichaActual} = require('../controllers/fichaController')


router.post('/crear', crearFicha)

router.get('/fichaActual',fichaActual)

module.exports = router