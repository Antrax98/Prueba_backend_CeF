const express = require('express')
const router = express.Router()

const {crearCuadrilla} = require('../controllers/cuadrillaController')


router.post('/crear', crearCuadrilla)

module.exports = router