const mongoose = require('mongoose')

const Base = require('./baseModel')
const Temporada = require('./temporadaModel')

const Schema = mongoose.Schema

const cuadrillaSchema = new Schema({
    base: {
        type: Schema.Types.ObjectId,
        ref: Base,
        required: true
    },
    temporada: {
        type: Schema.Types.ObjectId,
        ref: Temporada,
        required: true
    },
    horario: [{
        type: Date
    }]
})

module.exports = mongoose.model('Cuadrilla', cuadrillaSchema)