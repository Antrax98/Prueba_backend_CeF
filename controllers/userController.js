const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const Ficha = require('../models/fichaModel')
const Temporada = require('../models/temporadaModel')

const createToken = async (user) => {

    //obtener temporada actual
    let tempoAct

    try{
        let fechaAct = new Date()
        tempoAct = await Temporada.findOne({inicio: {$lte: fechaAct.getTime()}, fin: {$gte: fechaAct.getTime()}})
    }catch(error){
        tempoAct = null
        console.log("NO SE PUDO ENCONTREAR TEMPORADA ACTUAL EN TOKEN LOGIN")
    }

    //FIND si user tiene fichaactual
    let fichaAct
    try{
        if(tempoAct){
            fichaAct = await Ficha.findOne({user: user._id,temporada: tempoAct._id})
        }else{
            fichaAct = null
        }
    }catch(error){
        fichaAct = null
        console.log("NO SE PUDO ENCONTRAR UNA FICHA EN LA TEMPORADA ACTUAL")
    }

    //AGREGANDO CARGO DE LA TEMPORADA
    //NULL SI NO TIENE O ES ADMIN
    let cargo

    if(fichaAct){
        cargo = fichaAct.cargo
    }else{
        cargo = null
    }


    return jwt.sign(
        {
            _id : user._id,
            userType : user.userType,
            nombres: user.nombres,
            apellidos: user.apellidos,
            cargo: cargo
        },
        process.env.SECRET,
        {
            expiresIn: '1d'
        }
    )
}

//login
const loginUser = async (req,res) => {
    const {rut,password} = req.body

    try {
        const user = await User.login(rut,password)

        //crear TOKEN
        const token = await createToken(user)

        res.status(200).json({rut,token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//signup
const signupUser = async (req,res) => {
    const {email, password,rut,userType} = req.body

    try {
        const user = await User.signup(email,password,rut,userType)

        res.status(200).json({email,rut})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {signupUser, loginUser}