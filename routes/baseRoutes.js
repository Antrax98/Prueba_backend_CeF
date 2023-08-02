const express = require('express')
const router = express.Router()

const {crearBase,obtenerBases} = require('../controllers/baseController')


router.post('/crear', crearBase)
router.get('/obtener',obtenerBases)

module.exports = router