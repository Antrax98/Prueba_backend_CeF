const express = require('express')
const router = express.Router()

const {crearBase} = require('../controllers/baseController')


router.post('/crear', crearBase)

module.exports = router