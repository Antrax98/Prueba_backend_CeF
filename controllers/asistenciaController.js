
const Asistencia = require('../models/asistenciaModel')
const Usuario = require('../models/userModel')
const Ficha = require('../models/fichaModel')
const Cuadrilla = require('../models/cuadrillaModel')

const {startOfMonth,endOfMonth} = require('date-fns')
const {startOfDay, endOfDay} = require('date-fns')

//POSIBLEMENTE MERGER CON CREAR FICHA?
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
    }catch (error){
        return res.status(400).json({error: error.message})
    }
    let cuadrillaAct
    try{
        cuadrillaAct = await Cuadrilla.findById(fichaActual.cuadrilla)
    }catch(error){
        return res.status(400).json({error: error.message})
    }

    //crear todas las asistencias
    const horario = cuadrillaAct.horario
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

//no considera la fecha actual
const marcarAsistencia = async (req,res) => {
    const {asistencia_id} = req.body

    //Validar tipo de usuario
    //VALIDAR PODRIA NO SER NECESARIO a menos que se cree una especifica para admin(PREGUNTAR)
    // if(req.TOKENDATA.userType == "admin"){
    //     return res.status(400).json({message: "Es necesario ser un brigadista"})
    // }

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

//SOLO FUNCIONA CON UNA ASISTENCIA A LA VEZ
// admin-jefeCuadrilla
const aceptarAsistencia = async (req,res) => {
    const {asistencia_id} = req.body

    if(!asistencia_id){
        return res.status(400).json({message: 'Se requiere un objeto "asistencia_id"'})
    }

    //Validar tipo de usuario admin/brigadista
    if(req.TOKENDATA.userType != "admin"){
        if(req.FICHADATA.cargo != "JefeCuadrilla"){
            return res.status(400).json({message: "Es necesario ser un Jefe De Cuadrilla contratado o un administrador"})
        }else{
            let asistenciaAct
            try{
                asistenciaAct = await Asistencia.findById(asistencia_id).populate('ficha')
            }catch(error){
                return res.status(400).json({error: error.message})
            }
            //COMPARAR ID DE CUADRLLA ASISTENCIA CON LA DEL JEFE ACTUAL
            if(asistenciaAct.ficha.cuadrilla.toString() != req.FICHADATA.cuadrilla.toString()){
                return res.status(400).json({message: "tiene que ser jefe de cuadrilla"})
            }
        }
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

//(WIP) - (GET) - TESTING
//LA fecha ES SOLO PARA OBTENER EL AÑO Y MES, EL DIA NO ES NECESARIO
//FECHA RECIVIDA DEVE SER CON .getTime()
//asistencia mensual de todos los usuarios
const asistenciaMensual = async (req,res) => {
    let fechaTime = req.params.fecha
    let fecha = new Date(fechaTime)

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
        }).populate('ficha')

        
    }catch(error){
        return res.status(400).json({error: error.message})
    }

    //(TODO) Limpiar data antes de enviar
    
    let listaAsistencias

    try{
        listaAsistencias = await Asistencia.aggregate([
            {$match: {aceptado: true, marcado: true, fecha: {$gte: ini,$lt: fin}}},
            {$group: {'_id':'$_id',user: {'$first':'$user'},count: {$sum:1}}}
        ])
    }catch(error){
        return res.status(400).json({error: error.message})
    }

    console.log({message:'lista',datos:listaAsistencias})

    
    for(let i = 0; i<listaAsistencias.length;i++) {
        try{
            let userActList = await Usuario.findById(listaAsistencias[i].user)
            listaAsistencias[i].user = userActList.rut
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }
    

    return res.status(200).json({
        message: 'Asistencias aceptada correctamente',
        data: listaAsistencias
    })
}

//BRIGADISTA obtiene TODAS las asistencias/horario de la ficha actual
const obtenerHorario = async (req,res) => {

    if(req.TOKENDATA.userType == "admin"){
        return res.status(400).json({message: "Es necesario ser un brigadista contratado"})
    }

    //let horario
    try{
        let horario = await Asistencia.find({ficha: req.FICHADATA._id})
        return res.status(200).json({horario: horario})
    }catch(error){
        return res.status(400).json({error: error.message})
    }

    //si no funciona, colocar dentro de un .then()
    //return res.status(200).json({horario: horario})

}

//VERIFICA SI LA ASISTENCIA DEL DIA ESTA MARCADA O NO y SI ES QUE HOY HAY TRABAJO
//estatus: inexistente,marcado,no_marcado
//posiblemente retornar id_asistencia en caso de no estar marcada???
const verificarMarcado = async (req,res) => {
    
    //Validar tipo de usuario admin/brigadista
    if(req.TOKENDATA.userType != "brigadista"){
        return res.status(400).json({message: "Es necesario ser un brigadista"})
    }
    //Validar cargo de brigadista Brigadista/JefeCuadrilla
    // if(req.FICHADATA.cargo != "Brigadista"){
    //     return res.status(400).json({message: "Es necesario ser un Brigadista contratado"})
    // }

    let fechaAct = new Date()
    let fini = startOfDay(fechaAct)
    let ffin = endOfDay(fechaAct)

    //verificar si existe turno para hoy

    try{
        let asisAct = await Asistencia.findOne({
            fecha : {
                $gte: fini,
                $lt: ffin
            },
            user: req.TOKENDATA._id
            })
        
            if(!asisAct){
                return res.status(200).json({estatus: "inexistente"})
            }
            if(asisAct){
                if(asisAct.marcado) {
                    return res.status(200).json({estatus: "marcado"})
                }else{
                    return res.status(200).json({estatus: "no_marcado", asistencia: asisAct})
                }
            }
    }catch(error){
        return res.status(400).json({error: error.message})
    }

}

//(WIP) - TESTING
// SOLO JEFE BRIGADISTA
//entregar las asistencias por aceptar de la cuadrilla propia
//del dia actual una cierta cantidad de dias en el pasado (2 por ahora)
const asistenciasPorAceptar = async (req,res) => {


    let diasAtras = 3

    //Validar tipo de usuario admin/brigadista
    if(req.TOKENDATA.userType != "brigadista"){
        return res.status(400).json({message: "Es necesario ser un brigadista"})
    }
    //Validar cargo de brigadista Brigadista/JefeCuadrilla
    if(req.FICHADATA.cargo != "JefeCuadrilla"){
        return res.status(400).json({message: "Es necesario ser un Jefe De Cuadrilla contratado"})
    }

    let fechaAct = new Date()
    let ffin = endOfDay(fechaAct)
    let fechaIni = new Date(fechaAct.getTime())
    fechaIni.setDate(fechaIni.getDate()- diasAtras)
    let fini = startOfDay(fechaIni)

    let fich

    try{
        fich = await Ficha.find({cuadrilla:req.FICHADATA.cuadrilla})
    }catch(error){
        return res.status(400).json({error: error.message})
    }

    let fichasCuad = new Array()

    for(let i=0;i<fich.length;i++){
        fichasCuad.push(fich[i]._id.toString())
    }
    let asisXAcept
    try{
        asisXAcept = await Asistencia.find({ficha: {"$in":fichasCuad}, aceptado: false, marcado:true, fecha:{$gte:fini,$lte:ffin}}).populate('user')
    }catch(error){
        return res.status(400).json({error: error.message})
    }



    return res.status(200).json({asisXAcept:asisXAcept})

    
}

//


module.exports = {
    crearHorarioAsistencias,
    marcarAsistencia,
    aceptarAsistencia,
    asistenciaMensual,
    obtenerHorario,
    verificarMarcado,
    asistenciasPorAceptar
}