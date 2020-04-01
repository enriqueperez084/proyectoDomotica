const express = require('express'); //Asi se trae un modulo, asi se trajo express
const bodyParser = require('body-parser');
const router = require('./network/routes')
//import express from 'express' //Esta forma es una manera antigua

var app = express() //Se crea la app en express

app.use(bodyParser.json())
router(app) //Se mandan los requests a la seccion de routes.js
// app.use(router) //Se vincula la app con el router



app.use('/app', express.static('public'))

// app.use('/', function (req, res) { //Se crea un uso en para que cuando se solicite algo desde cualquier parte te regrese un hola
//     res.send('Hola')
// })

app.listen(3000) //Aqui se declara en que puerto estara escuchando la app
console.log('La aplicacion esta escuchando en http://localhost:3000')