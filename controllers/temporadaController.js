// import endOfDay from 'date-fns/endOfDay'
// import startOfDay from 'date-fns/startOfDay'

const {endOfDay,startOfDay} = require('date-fns')

const Temporada = require('../models/temporadaModel')

const crearTemporada = async (req,res) => {
    const {fecha_ini, fecha_fin,temporada_tipo} = req.body

    //(TODO)Revisar que fecha_ini es menor que fecha_fin por almenos 1 mes


    //OBTENER BUENOS DATOS
    let ref_ini = new Date(fecha_ini)
    let ref_fin = new Date(fecha_fin)

    let inicio_var = startOfDay(ref_ini)
    let fin_var = endOfDay(ref_fin)

    //Crear nueva temporada
    const newTemporada = new Temporada({
        inicio: inicio_var,
        fin: fin_var,
        tipo: temporada_tipo
    })

    try{
        let resp = await newTemporada.save();
        return res.status(200).json({
        message: 'temporada creada correctamente',
        temporada: resp
    })
    }catch(error){
        return res.status(400).json({error: error.message})
    }
    
}

//obtener las temporadas actual y futura
const tempoActFut = async (req,res) => {

    let fechaAct = new Date();

    let tempos
    try{
        tempos = await Temporada.find({fin: {$gte : fechaAct}})
    }catch(error){
        return res.status(400).json({error: error.message})
    }

    return res.status(200).json({temporadas: tempos})

}

//obtener absolutamente todas las temporadas
const obtenerTemporadas = async (req,res) => {

    let tempos
    try{
        tempos = await Temporada.find({})
    }catch(error){
        return res.status(400).json({error: error.message})
    }

    return res.status(200).json({temporadas: tempos})

}

module.exports = {
    crearTemporada,
    tempoActFut,
    obtenerTemporadas
}