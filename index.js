require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('./routes/userRoutes')
const cuadrillaRoutes = require('./routes/cuadrillaRoutes')
const fichaRoutes = require('./routes/fichaRoutes')
const asistenciaRoutes = require('./routes/asistenciaRoutes')
const baseRoutes = require('./routes/baseRoutes')
const temporadaRoutes = require('./routes/temporadaRoutes')

const app = express()

//MIDDLEWARE
app.use(express.json())
// app.use((req,res,next) => {
//     console.log(req.path, req.method)
// })

//ROUTES
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

