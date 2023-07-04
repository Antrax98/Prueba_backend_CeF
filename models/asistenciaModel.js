const mongoose = require('mongoose')

const Usuario = require('./userModel')
const Ficha = require('./fichaModel')

const Schema = mongoose.Schema

const asistenciaSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Usuario,
        required: true
    },
    ficha: {
        type: Schema.Types.ObjectId,
        ref: Ficha,
        required: true
    },
    aceptado: {
        type: Boolean,
        default: false
    },
    marcado: {
        type: Boolean,
        default: false
    },
    fecha: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('Asistencia', asistenciaSchema)