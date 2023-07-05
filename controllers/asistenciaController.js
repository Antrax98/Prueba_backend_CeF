
const Asistencia = require('../models/asistenciaModel')
const Usuario = require('../models/userModel')
const Ficha = require('../models/fichaModel')
const Cuadrilla = require('../models/cuadrillaModel')

const crearHorarioAsistencias = async (req,res) => {
    const {ficha_id} = req.body

    //TODO: REVISAR SI LA FICHA YA TIENE SU HORARIOXASISTENCIAS CREADO

    if(!ficha_id){
        return res.status(400).json({message: 'Se requiere un objeto "ficha_id"'})
    }

    let fichaActual
    try{
        fichaActual = await Ficha.findById(ficha_id)
        console.log(fichaActual)
        console.log(fichaActual.cuadrilla)
    }catch (error){
        return res.status(400).json({error: error.message})
    }
    let cuadrillaAct
    try{
        cuadrillaAct = await Cuadrilla.findById(fichaActual.cuadrilla)
    }catch(error){
        return res.status(400).json({error: error.message})
    }
    console.log(cuadrillaAct)
    //crear todas las asistencias
    const horario = cuadrillaAct.horario
    console.log(cuadrillaAct.horario)
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
            return res.status(200).json({
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
            return res.status(200).json({
                message: 'Asistencias marcada correctamente'
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
            return res.status(200).json({
                message: 'Asistencias aceptada correctamente'
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