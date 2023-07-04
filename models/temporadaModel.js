//MODELO NO CONVERSADO
const mongoose = require('mongoose')

const Schema = mongoose.Schema
const temporadaSchema = new Schema({
    inicio: {
        type: Date,
        required: true
    },
    fin: {
        type: Date,
        required: true
    },
    tipo: {
        type: String,
        enum: ['Alta','Baja'],
        required: true
    }
})

module.exports = mongoose.model('Temporada', temporadaSchema)