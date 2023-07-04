const mongoose = require('mongoose')

const Schema = mongoose.Schema

//AGREGAR MAS DATOS SI ES QUE ES NECESARIO
//por ahora solo el nombre es necesario 

const baseSchema = new Schema({
    nombre: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Base', baseSchema)