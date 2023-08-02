const express = require('express')
const router = express.Router()

const {crearCuadrilla,prueba,obtenerCuadrillas} = require('../controllers/cuadrillaController')


router.post('/crear', crearCuadrilla)
router.post('/prueba', prueba)
router.get('/obtenerCuadrillas', obtenerCuadrillas)

module.exports = router