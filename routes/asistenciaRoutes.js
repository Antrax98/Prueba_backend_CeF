const express = require('express')
const router = express.Router()

const {
    crearHorarioAsistencias,
    marcarAsistencia,
    aceptarAsistencia
} = require('../controllers/asistenciaController')


router.post('/crearHorario', crearHorarioAsistencias)

router.patch('/aceptar', aceptarAsistencia)

router.patch('/marcar', marcarAsistencia)

module.exports = router