const Base = require('../models/baseModel')
const Temporada = require('../models/temporadaModel')
const Cuadrilla = require('../models/cuadrillaModel')

const crearCuadrilla = async (req,res) => {
    const {temporada_id,base_id} = req.body

    //REVISAR SI FALTAN VARIABLES
    if(!temporada_id && !base_id){
        return res.status(400).json({message: 'Faltan datos'})
    }

    //(TODO)revisar si las id son correctas??

    //Ver cuantas cuadrillas temporadaXbase exxisten
    let cuadrillas_ex

    try{
        cuadrillas_ex = await Cuadrilla.countDocuments({
            base: base_id,
            temporada: temporada_id
        })
    }catch(error){
        return res.status(400).json({error: error.message})
    }

    let temporada_act
    try{
        temporada_act = await Temporada.findById(temporada_id)
    }catch(error){
        return res.status(400).json({error: error.message})
    }

    let horario = crearHorarioCuadrilla(cuadrillas_ex,temporada_act.inicio,temporada_act.fin)

    const newCuadrilla = new Cuadrilla({
        base: base_id,
        temporada: temporada_id,
        horario: horario
    })

    try{
        let resp = await newCuadrilla.save().then()
        return res.status(200).json({message: 'Cuadrilla creada correctamente', cuadrilla: resp})
    }catch(error){
        return res.status(400).json({error: error.message})
    }
}

const prueba = async (req,res) => {
    const {temporada_id,base_id} = req.body

    //REVISAR SI FALTAN VARIABLES
    if(!temporada_id && !base_id){
        return res.status(400).json({message: 'Faltan datos'})
    }

    //(TODO)revisar si las id son correctas??

    //Ver cuantas cuadrillas temporadaXbase exxisten
    let cuadrillas_ex

    try{
        cuadrillas_ex = await Cuadrilla.countDocuments({
            base: base_id,
            temporada: temporada_id
        })
    }catch(error){
        return res.status(400).json({error: error.message})
    }

    let temporada_act
    try{
        temporada_act = await Temporada.findById(temporada_id)
    }catch(error){
        return res.status(400).json({error: error.message})
    }


    let horario = crearHorarioCuadrilla(0,temporada_act.inicio,temporada_act.fin)

    return res.status(200).json({horario: horario})
}

const obtenerCuadrillas = async (req,res) => {

    let cuadris
    try{
        cuadris = await Cuadrilla.find({}).populate('base').populate('temporada')
    }catch(error){
        return res.status(400).json({error: error.message})
    }

    return res.status(200).json({cuadrillas: cuadris})

}

module.exports = {
    crearCuadrilla,
    prueba,
    obtenerCuadrillas
}

//ZONA FUNCIONES

//Modificar esta f() si se quiere distinto orden de horarios
const crearHorarioCuadrilla = (numeroCuadrillas,inicio,fin) => {
    //ordenes
    //0 = 10t 5d
    //1 = 5t 5d 5t
    //2 = 5d 10t
    let numC = 0
    if(numeroCuadrillas != 0){
        numC = numeroCuadrillas % 3
    }

    const horario = []
    let auxDate = new Date(inicio)
    let auxNum = 1
    auxDate.setHours(12)
    while(auxDate.getTime()<fin.getTime()){
        //DO SOMETHING

        let pusher = new Date(auxDate.getTime())

        if(auxNum>0 && auxNum<=5 && (numC==0 || numC==1)){
            horario.push(pusher)
        }
        if(auxNum>5 && auxNum<=10 && (numC==1 || numC==2)){
            horario.push(pusher)
        }
        if(auxNum>10 && auxNum<=15 && (numC==0 || numC==2)){
            horario.push(pusher)
        }


        if(auxNum==15){
            auxNum=1
        }else{
            auxNum++
        }
        auxDate.setDate(auxDate.getDate()+1)
    }

    return horario

}