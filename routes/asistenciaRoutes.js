const express = require('express')
const router = express.Router()

const {
    crearHorarioAsistencias,
    marcarAsistencia,
    aceptarAsistencia,
    asistenciaMensual,
    obtenerHorario,
    verificarMarcado,
    asistenciasPorAceptar
} = require('../controllers/asistenciaController')


router.post('/crearHorario', crearHorarioAsistencias)

router.patch('/aceptar', aceptarAsistencia)

router.patch('/marcar', marcarAsistencia)

router.get('/asistenciaMensual/:fecha', asistenciaMensual)

router.get('/obtenerHorario', obtenerHorario)

router.get('/verificarMarcado', verificarMarcado)

router.get('/asistenciaPorAceptar', asistenciasPorAceptar)

module.exports = router