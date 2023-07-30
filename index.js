require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');

const {requireAuth} = require('./middleware/authMiddleware')
const {fichaAggregator} = require('./middleware/dataAggregatorMiddleware')

const userRoutes = require('./routes/userRoutes')
const cuadrillaRoutes = require('./routes/cuadrillaRoutes')
const fichaRoutes = require('./routes/fichaRoutes')
const asistenciaRoutes = require('./routes/asistenciaRoutes')
const baseRoutes = require('./routes/baseRoutes')
const temporadaRoutes = require('./routes/temporadaRoutes')

const app = express()
const cors = require('cors');

app.use(cors());
// app.listen(4000, () => {
//     console.log('Servidor iniciado en el puerto 4000');
//   });


//MIDDLEWARE
app.use(express.json())
// app.use((req,res,next) => {
//     console.log(req.path, req.method)
// })

app.use(requireAuth)
app.use(fichaAggregator)

// app.use((req,res,next) => {
//     console.log(req.headers.authorization)
//     req.TOKENDATA = {MENSAJEEEEEEEEEEEEEEEEEEE: "AAAAAAAAAAAAAAGGGGGHHHHHHHHHHHHHH"}
//     return next()
// })

//ROUTES
app.use('/api/test', (req,res) => {return res.status(200).json(req.FICHADATA)})
app.use('/api/user', userRoutes)
app.use('/api/cuadrilla', cuadrillaRoutes)
app.use('/api/ficha', fichaRoutes)
app.use('/api/asistencia', asistenciaRoutes)
app.use('/api/base', baseRoutes)
app.use('/api/temporada', temporadaRoutes)

//BASE DE DATOS
mongoose.connect(process.env.MONGO_URI)
    .then (() => {
        console.log("conectado a la base de datos")
        app.listen (process.env.PORT, () => {
            console.log('servidor iniciado en el puerto '+process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })

