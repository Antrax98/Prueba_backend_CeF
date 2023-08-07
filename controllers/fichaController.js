const Ficha = require('../models/fichaModel')
const Usuario = require('../models/userModel')
const Cuadrilla = require('../models/cuadrillaModel')
const Asistencia = require('../models/asistenciaModel')


//MODIFICAR SI SE AÑADEN MAS VALORES A BASE
const crearFicha = async (req,res) => {
    const {user_id,cargo,cuadrilla_id,temporada_id} = req.body

    //Validar tipo de usuario
    if(req.TOKENDATA.userType != "admin"){
        return res.status(400).json({message: "Es necesario ser un admin"})
    }

    const newFicha = new Ficha({
        user: user_id,
        cargo: cargo,
        cuadrilla: cuadrilla_id,
        temporada: temporada_id
    })

    let resp
    try{
        resp = await newFicha.save()
    }catch(error){
        return res.status(400).json({error: error.message})
    }

    //FUCIONANDO CREAR HORARIO AQUI
    const ficha_id = resp._id


    //TODO: REVISAR SI LA FICHA YA TIENE SU HORARIOXASISTENCIAS CREADO
    
    let cuadrillaAct
    try{
        cuadrillaAct = await Cuadrilla.findById(cuadrilla_id)
    }catch(error){
        return res.status(400).json({error: error.message})
    }

    //crear todas las asistencias
    const horario = cuadrillaAct.horario
    let asistencias = []

    for(const hora of horario) {
        let asis = new Asistencia({
            user: user_id,
            ficha: ficha_id,
            fecha: hora
        })
        asistencias.push(asis)
    }

    try{
        await Asistencia.insertMany(asistencias)
    }catch(error){
        return res.status(400).json({error: error.message})
    }


    return res.status(200).json({message: 'Ficha creada correctamente', ficha: resp})
}

const fichaActual = async (req,res) => {

    //Validar tipo de usuario admin/brigadista
    if(req.TOKENDATA.userType != "brigadista"){
        return res.status(400).json({message: "Es necesario ser un brigadista"})
    }

    return res.status(200).json({ficha: req.FICHADATA})

}

const usuariosSinFichaEnTemporada = async (req,res) => {
    
    let tempoAct = req.params.temporada

    
    let fichasTemp
    let coun

    try{
        fichasTemp = await Ficha.find({temporada: tempoAct})
        coun = await Ficha.find({temporada: tempoAct}).count()
    }catch(error){
        return res.status(400).json({error: error.message})
    }

    const listaMatch = new Array()
    
    for(let i=0;i<coun;i++){
        listaMatch.push(fichasTemp[i].user.toString())
    }
    
    let briga
    
    try{
        briga = await Usuario.find({userType: "brigadista", _id : {'$nin': listaMatch}})
    }catch(error){
        return res.status(400).json({error: error.message})
    }

    return res.status(200).json({disponibles: briga})


}

module.exports = {
    crearFicha,
    fichaActual,
    usuariosSinFichaEnTemporada
}