
const Asistencia = require('../models/asistenciaModel')
const Usuario = require('../models/userModel')
const Ficha = require('../models/fichaModel')
const Cuadrilla = require('../models/cuadrillaModel')

const {startOfMonth,endOfMonth} = require('date-fns')

const crearHorarioAsistencias = async (req,res) => {
    const {ficha_id} = req.body

    //Validar tipo de usuario
    if(req.TOKENDATA.userType != "admin"){
        return res.status(400).json({message: "Es necesario ser un admin"})
    }

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

    //Validar tipo de usuario
    //VALIDAR PODRIA NO SER NECESARIO (PREGUNTAR)
    if(req.TOKENDATA.userType == "admin"){
        return res.status(400).json({message: "Es necesario ser un brigadista"})
    }

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

//LA fecha ES SOLO PARA OBTENER EL AÑO Y MES, EL DIA NO ES NECESARIO
const asistenciaMensual = async (req,res) => {
    const {fecha} = req.body

    //Validar tipo de usuario
    if(req.TOKENDATA.userType != "admin"){
        return res.status(400).json({message: "Es necesario ser un admin"})
    }

    let aux = new Date(fecha)
    let ini = startOfMonth(aux)
    let fin = endOfMonth(aux)

    let data
    try{
        data = await Asistencia.find({
            aceptado: true,
            marcado: true,
            fecha : {
                $gte: ini,
                $lt: fin
            }
        })

        //(TODO) Limpiar data antes de enviar


        return res.status(200).json({
            message: 'Asistencias aceptada correctamente',
            data: data
        })
    }catch(error){
        return res.status(400).json({error: error.message})
    }
}

//ADMIN obtiene TODAS las asistencias de la temporada de una ficha
const obtenerAsistencia = async (req,res) => {
    const {ficha_id,temporada_id} = req.body

    if(req.TOKENDATA.userType != "admin"){
        return res.status(400).json({message: "Es necesario ser un admin"})
    }

    if(!ficha_id){
        return res.status(400).json({message: "falta el dato 'ficha_id'"})
    }



}

module.exports = {
    crearHorarioAsistencias,
    marcarAsistencia,
    aceptarAsistencia,
    asistenciaMensual
}