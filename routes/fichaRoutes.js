const express = require('express')
const router = express.Router()

const {crearFicha} = require('../controllers/fichaController')


router.post('/crear', crearFicha)

module.exports = router