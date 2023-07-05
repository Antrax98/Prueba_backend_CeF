const express = require('express')
const router = express.Router()

const {crearCuadrilla,prueba} = require('../controllers/cuadrillaController')


router.post('/crear', crearCuadrilla)
router.post('/prueba', prueba)

module.exports = router