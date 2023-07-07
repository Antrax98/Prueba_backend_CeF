require('dotenv').config()

const jwt = require('jsonwebtoken')

const requireAuth = (req, res, next) => {
    if (req.headers.authorization){
        let token = req.headers.authorization.split(" ")[1];
        
        try{
            let decode = jwt.verify(token, process.env.SECRET)
            console.log(decode)
            req.TOKENDATA = decode
            return next()
        }catch(error){
            return res.status(400).json({error: error.message})
        }

    }
    if(req.url =="/api/user/login" || req.url =="/api/user/signup"){
        return next()
    }
    return res.status(400).json({message: "Es necesario un JWT"})
}

module.exports = {requireAuth}