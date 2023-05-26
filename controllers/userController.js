const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = async (user) => {

    return jwt.sign(
        {
            _id : user._id,
            userType : user.userType
        },
        process.env.SECRET,
        {
            expiresIn: '3d'
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
    const {email, password,rut,admin,brigadista} = req.body

    try {
        const user = await User.signup(email,password,rut,admin,brigadista)

        res.status(200).json({email,rut})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {signupUser, loginUser}