const mongoose = require('mongoose')

const Usuario = require('./userModel')
const Cuadrilla = require('./cuadrillaModel')

const Schema = mongoose.Schema

const fichaSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: Usuario,
        required: true
    },
    cargo: {
        type: String,
        enum: ['Brigadista','JefeCuadrilla'],
        required: true
    },
    cuadrilla: {
        type: Schema.Types.ObjectId,
        ref: Cuadrilla,
        required: true
    }
})

module.exports = mongoose.model('Ficha', fichaSchema)