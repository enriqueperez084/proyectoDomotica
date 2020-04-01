const express = require('express')
const message = require('../components/message/network')

const routes = function (server) { //Se hace la funcion principal para distribuir los request a los componentes correspondientes
    server.use('/message', message)
}

module.exports = routes