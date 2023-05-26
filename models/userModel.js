const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator =require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    rut: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        requires: true
    },
    userType: {
        type: String,
        enum: ['admin','brigadista','jefe_cuadrilla','lider_brigada','central']
    }
},
{
    timestamps: true
})

//static signup method
//ENTREGAR OBJETO COMPLETO MEJOR???
//VALIDAR LOS DATOS
userSchema.statics.signup = async function(email, password, rut, userType) {

    //validacion
    if(!email || !password || !rut) {
        throw Error('no debe haber campos vacios')
    }
    if(!validator.isEmail(email)) {
        throw Error('Email invalido')
    }
    //*quitarlo si molesta mucho
    if(!validator.isStrongPassword(password)) {
        throw Error('password inseguro')
    }


    //hacer lo mismo con el rut si es necesario
    const exist = await this.findOne({email})
    if (exist) {
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({email, password: hash,rut,admin,brigadista})

    return user
}

//static login method
userSchema.statics.login = async function(email, password) {

    if(!email || !password) {
        throw Error('no debe haber campos vacios')
    }

    const user = await this.findOne({email})

    if (!user){
        throw Error('Usuario no existe')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match){
        throw Error('password incorrecto')
    }

    return user
}

module.exports = mongoose.model('User', userSchema)