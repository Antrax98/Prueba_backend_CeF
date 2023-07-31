const {startOfMonth,endOfMonth} = require('date-fns')
const Temporada = require('../models/temporadaModel')



//se asegura de que exista una temporada futura a la actual(si es que existe una actual)
//y de no existir, la creara en su rango apropiado
//EJECUTADO cada 1 de cada mes
//Temporada: Alta(noviembre->abril),Baja(mayo->octubre)
const nuevaTemporada = async () => {
    
    let fechaAct = new Date()

    let mesAct = fechaAct.getMonth()
    let anioAct = fechaAct.getYear() + 1900

    //verificar si existe una temporada futura a la actual

    //QU NIVEL ES EL ACTUAL
    let nivelAct
    if(mesAct>=4 && mesAct<=9){
        nivelAct = 'Baja'
    }
    
    if(mesAct<=3){
        nivelAct = 'Alta'
    }

    if(mesAct>=10){
        nivelAct = 'Alta'
    }

    let nivelFuturo
    // designa el tipo de temporada futura
    if(nivelAct=='Baja'){
        nivelFuturo = 'Alta'
    }else{
        nivelFuturo = 'Baja'
    }
    
    let tempoFutu
    try{
        tempoFutu = await Temporada.findOne({inicio: {$gte: fechaAct.getTime()}, tipo: nivelFuturo})
    }catch(error){
        console.log("TEMPORADA ACTUAL NO PUDO SER OBTENIDA CORRECTAMENTE",error.message)
    }

    if(tempoFutu){
        console.log("TEMPOREADA FUTURA YA EXISTE (verificado cada mes)", tempoFutu)
        return
    }


    //Creacion de temporada futura
    if(mesAct>=4 && mesAct<=9){
        //temporada baja año actual
        nivel = "Alta"

        fechaIni = startOfMonth(new Date(anioAct,10))
        fechaFin = endOfMonth(new Date(anioAct+1,3))

    }
    
    if(mesAct<=3){
        //temporada alta año pasado-actual
        nivel = "Baja"

        fechaIni = startOfMonth(new Date(anioAct,4))
        fechaFin = endOfMonth(new Date(anioAct,9))
    }

    if(mesAct>=10){
        //temporada alta año actual-futuro
        nivel = "Baja"
        
        fechaIni = startOfMonth(new Date(anioAct+1,4))
        fechaFin = endOfMonth(new Date(anioAct+1,9))
    }

    try{
        await Temporada.create({inicio: fechaIni, fin: fechaFin, tipo: nivel})
        console.log("TEMPORADA FUTURA CREADA CORRECTAMENTE")
        return
    }catch(error){
        console.log("TEMPORADA FUTURA NO PUDO SER CREADA CORRECTAMENTE", error.message)
        return
    }

}

const creaTemp = async () => {
    let tempoAct

    let fechaAct = new Date()

    try{
        tempoAct = await Temporada.findOne({inicio: {$lte: fechaAct.getTime()}, fin: {$gte: fechaAct.getTime()}})
    }catch(error){
        console.log("TEMPORADA ACTUAL NO PUDO SER OBTENIDA CORRECTAMENTE",error.message)
    }

    let mesAct = fechaAct.getMonth()
    let anioAct = fechaAct.getYear() + 1900

    //verificar si existe una temporada actual, sino crearla
    if(!tempoAct){
        mesAct = fechaAct.getMonth()
        anioAct = fechaAct.getYear() + 1900

        let fechaIni
        let fechaFin
        let nivel

        if(mesAct>=4 && mesAct<=9){
            //temporada baja año actual
            nivel = "Baja"

            fechaIni = startOfMonth(new Date(anioAct,4))
            fechaFin = endOfMonth(new Date(anioAct,9))

        }
        
        if(mesAct<=3){
            //temporada alta año pasado-actual
            nivel = "Alta"

            fechaIni = startOfMonth(new Date(anioAct-1,10))
            fechaFin = endOfMonth(new Date(anioAct,3))

        }

        if(mesAct>=10){
            //temporada alta año actual-futuro
            nivel = "Alta"
            
            fechaIni = startOfMonth(new Date(anioAct,10))
            fechaFin = endOfMonth(new Date(anioAct+1,3))
        }

        try{
            await Temporada.create({inicio: fechaIni, fin: fechaFin, tipo: nivel})
            console.log("TeMEPORADA ACTUAL CREADA CORRECTAMENTE")
            return
        }catch(error){
            console.log("TEMPORADA ACTUAL NO PUDO SER CREADA CORRECTAMENTE", error.message)
            return
        }

    }else{
        console.log("TEMPORADA ACTUAL YA EXISTE",tempoAct)
    }
}

module.exports = {
    nuevaTemporada,
    creaTemp
}