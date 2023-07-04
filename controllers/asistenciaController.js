import endOfDay from 'date-fns/endOfDay'
import startOfDay from 'date-fns/startOfDay'

const Asistencia = require('../models/asistenciaModel')
const Usuario = require('../models/userModel')
const Ficha = require('../models/fichaModel')

const crearHorarioAsistencias = async (req,res) => {
    const {ficha_id} = req.body

    if(!ficha_id){
        return res.status(400).json({message: 'Se requiere un objeto "ficha_id"'})
    }

    let fichaActual
    try{
        fichaActual = await Ficha.findById(ficha_id).populate('user', 'cuadrilla')
    }catch (error){
        return res.status(400).json({error: error.message})
    }

    //crear todas las asistencias
    let horario = fichaActual.cuadrilla.horario
    let asistencias = []

    for(const hora of horario) {
        let asis = new Asistencia({
            user: fichaActual.user._id,
            ficha: ficha_id,
            fecha: hora
        })
        asistencias.push(asis)
    }

    try{
        Asistencia.insertMany(asistencias).then((docs) => {
            return res.statur(200).json({
                message: 'Asistencias creadas correctamente',
                asistencias: asistencias
            })
        })

    }catch(error){
        return res.status(400).json({error: error.message})
    }

}

const marcarAsistencia = async (req,res) => {
    const {asistencia_id} = req.body

    if(!asistencia_id){
        return res.status(400).json({message: 'Se requiere un objeto "asistencia_id"'})
    }

    try{
        Asistencia.findByIdAndUpdate(asistencia_id, {marcado: true}).then((doc) => {
            return res.statur(200).json({
                message: 'Asistencias marcada correctamente',
                asistencia: doc
            })
        })
    }catch(error){
        return res.status(400).json({error: error.message})
    }

}

const aceptarAsistencia = async (req,res) => {
    const {asistencia_id} = req.body

    if(!asistencia_id){
        return res.status(400).json({message: 'Se requiere un objeto "asistencia_id"'})
    }

    try{
        Asistencia.findByIdAndUpdate(asistencia_id, {aceptado: true}).then((doc) => {
            return res.statur(200).json({
                message: 'Asistencias aceptada correctamente',
                asistencia: doc
            })
        })
    }catch(error){
        return res.status(400).json({error: error.message})
    }
}

module.exports = {
    crearHorarioAsistencias,
    marcarAsistencia,
    aceptarAsistencia
}