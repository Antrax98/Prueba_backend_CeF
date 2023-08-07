const Ficha = require('../models/fichaModel')
const Temporada = require('../models/temporadaModel')

const fichaAggregator = async (req,res,next) => {
    

    if (!req.TOKENDATA){
        return next()
    }

    const user_id = req.TOKENDATA._id

    let tempoAct

    try{
        let fechaAct = new Date()
        tempoAct = await Temporada.findOne({inicio: {$lte: fechaAct.getTime()}, fin: {$gte: fechaAct.getTime()}})
    }catch(error){
        return res.status(400).json({error: error.message})
    }

    if(!tempoAct){
        return next()
    }

    let fichaAct

    try{
        fichaAct = await Ficha.findOne({user: user_id, temporada: tempoAct._id})
    }catch(error){
        return res.status(400).json({error: error.message})
    }

    if(!fichaAct){
        return next()
    }

    req.FICHADATA = fichaAct
    return next()
}

module.exports = {fichaAggregator}