const Ficha = require('../models/fichaModel')
const Temporada = require('../models/temporadaModel')

const fichaAggregator = async (req,res,next) => {
    const user_id = req.TOKENDATA._id

    try{
        let fechaAct = new Date()
        console.log(fechaAct)
        let tempoAct = await Temporada.findOne({inicio: {$lte: fechaAct}, fin: {$gte: fechaAct}})
        console.log(tempoAct)
        let fichaAct = await Ficha.findOne({user: user_id, temporada: tempoAct._id})
        console.log(fichaAct)

        req.FICHADATA = fichaAct
        return next()
    }catch(error){
        return res.status(400).json({error: error.message})
    }

}

module.exports = {fichaAggregator}