const Ficha = require('../models/fichaModel')


//MODIFICAR SI SE AÑADEN MAS VALORES A BASE
const crearFicha = async (req,res) => {
    const {user_id,cargo,cuadrilla_id,temporada_id} = req.body

    

    const newFicha = new Ficha({
        user: user_id,
        cargo: cargo,
        cuadrilla: cuadrilla_id,
        temporada: temporada_id
    })

    try{
        let resp = await newFicha.save()
        return res.status(200).json({message: 'Ficha creada correctamente', ficha: resp})
    }catch(error){
        return res.status(400).json({error: error.message})
    }

}

const fichaActual = async (req,res) => {

    //Validar tipo de usuario admin/brigadista
    if(req.TOKENDATA.userType != "brigadista"){
        return res.status(400).json({message: "Es necesario ser un brigadista"})
    }

    //console.log(req)
    return res.status(200).json({ficha: req.FICHADATA})

}

module.exports = {
    crearFicha,
    fichaActual
}