const Ficha = require('../models/fichaModel')


//MODIFICAR SI SE AÑADEN MAS VALORES A BASE
const crearFicha = async (req,res) => {
    const {user_id,cargo,cuadrilla_id} = req.body

    

    const newFicha = new Ficha({
        user: user_id,
        cargo: cargo,
        cuadrilla: cuadrilla_id
    })

    try{
        let resp = await newFicha.save()
        return res.status(200).json({message: 'Ficha creada correctamente', ficha: resp})
    }catch(error){
        return res.status(400).json({error: error.message})
    }

}

module.exports = {crearFicha}