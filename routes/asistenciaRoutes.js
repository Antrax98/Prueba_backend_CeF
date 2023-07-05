const express = require('express')
const router = express.Router()

const {
    crearHorarioAsistencias,
    marcarAsistencia,
    aceptarAsistencia,
    asistenciaMensual
} = require('../controllers/asistenciaController')


router.post('/crearHorario', crearHorarioAsistencias)

router.patch('/aceptar', aceptarAsistencia)

router.patch('/marcar', marcarAsistencia)

router.get('/asistenciaMensual', asistenciaMensual)

module.exports = router