import endOfDay from 'date-fns/endOfDay'
import startOfDay from 'date-fns/startOfDay'

const Asistencia = require('../models/asistenciaModel')
const Brigadista = require('../models/userModel')
const jwt = require('jsonwebtoken')

//Registrar asistencia
//esta 
const crearAsistencia = async (req,res) => {
    const {rut} = req.body

    //buscar usuario
    let brigadistaAct
    try{
        brigadistaAct = await Brigadista.findOne({rut: rut});
    }catch (error){
        return res.status(400).json({message})
    }
    
    //obtener hora actual
    let fecha_actual = Date.now()
    hora_actual = fecha_actual.getHours()

    //VALIDACION 1 si brigadista no existe (o hay error buscandolo?)
    if (!brigadistaAct) {
        throw Error('El brigadista no existe')
    }

    //buscar si existe una asistencia el mismo dia
    const fecha_in = startOfDay(Date.now())
    const fecha_fi = endOfDay(Date.now())
    const existeAsistencia = await Asistencia.findOne({
        _id: brigadistaAct._id,
        fecha: {"$gte": fecha_in, "$lt": fecha_fi}    
    })

    //VALIDACION 2 Que solo exista una asistenciaXbrigadista al dia
    if (existeAsistencia) {
        return res.status(400).json({message: "Ya esxiste una asistencia para este dia"})
    }

    //VALIDACION 3 fecha en horario permitido (8:00 <-actual-> 18:00)
    if (hora_actual < 8 && hora_actual >= 18){
        return res.status(400).json({message: "Hora esta fuera del rango permitido"})
    }

    //Verificar si es un brigadista normal o un jefe
    // para auto aceptar asistencias de jefes
    
    try {

        if (brigadista.userType == 'jefe_cuadrilla'){
            const asistencia = await this.create({fecha: Date.now(), brigadista: brigadistaAct._id, aceptado: true})
        }else{
            const asistencia = await this.create({fecha: Date.now(), brigadista: brigadistaAct._id, aceptado: false})
        }

        return res.status(200).json(asistencia)
    }catch (error){
        return res.status(400).json({error: error.message})
    }

}

//ACEPTAR ASISTENCIA
//! (SI SE PUEDE QUE VERIFIQUE QUE QUIEN LAME LA FUNCION SEA UN JEFE)
const aceptarAsistencia = async (req,res) => {
    const {asistenciaId} = req.body

    try{
        asistencia.findOneAndUpdate({_id: asistenciaId},{aceptado: true},function(err,asis){
            return res.status(200).json(asis)
        })
    }catch (error){
        return res.status(400).json({error: error.message})
    }

}

module.exports = {
    crearAsistencia,
    aceptarAsistencia
}