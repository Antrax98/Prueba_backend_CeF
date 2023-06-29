import endOfDay from 'date-fns/endOfDay'
import startOfDay from 'date-fns/startOfDay'

const mongoose = require('mongoose')
const brigadista = require('./userModel')

const Schema = mongoose.Schema

const asistenciaShema = new Schema({
    brigadista: {
        type: mongoose.Schema.Types.ObjectId,
        ref: brigadista,
        required: true
    },
    aceptado: {
        type: Boolean,
        default: false
    },
    fecha: {
        type: Date,
        required: true,
        default: Date.now()
    }
})

module.exports = mongoose.model('Asistencia', asistenciaSchema)