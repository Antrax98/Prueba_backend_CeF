import endOfDay from 'date-fns/endOfDay'
import startOfDay from 'date-fns/startOfDay'

const Temporada = require('../models/temporadaModel')

const crearTemporada = async (req,res) => {
    const {fecha_ini, fecha_fin,temporada_tipo} = req.body

    //(TODO)Revisar que fecha_ini es menor que fecha_fin por almenos 1 mes


    //OBTENER BUENOS DATOS
    let inicio_var = fecha_ini.startOfDay()
    let fin_var = fecha_fin.endOfDay()

    //Crear nueva temporada
    const newTemporada = new Temporada({
        inicio: new Date(),
        fin: new Date(),
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

module.exports = {crearTemporada}