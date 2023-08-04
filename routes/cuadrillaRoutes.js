const express = require('express')
const router = express.Router()

const {crearCuadrilla,prueba,obtenerCuadrillas,obtenerCuadrillasEnBase} = require('../controllers/cuadrillaController')


router.post('/crear', crearCuadrilla)
router.post('/prueba', prueba)
router.get('/obtenerCuadrillas', obtenerCuadrillas)
router.get('/obtenerCuadrillasEnBase/:base', obtenerCuadrillasEnBase)

module.exports = router