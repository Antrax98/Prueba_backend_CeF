const Base = require('../models/baseModel')


//MODIFICAR SI SE AÑADEN MAS VALORES A BASE
const crearBase = async (req,res) => {
    const {nombre} = req.body

    //verificar si existen valores
    if(!nombre){
        return res.status(400).json({message: 'Faltan datos act'})
    }
    
    const newBase = new Base({
        nombre: nombre
    })

    try{
        let resp = await newBase.save()
        return res.status(200).json({message: 'Base creada correctamente', base: resp})
    }catch(error){
        return res.status(400).json({error: error.message})
    }

}

//retorna todas las bases con sus nombres
const obtenerBases = async (req,res) => {

    let bas
    try{
        bas = await Base.find({})
    }catch(error){
        return res.status(400).json({error: error.message})
    }

    return res.status(200).json({Bases: bas})

}

module.exports = {
    crearBase,
    obtenerBases,
}