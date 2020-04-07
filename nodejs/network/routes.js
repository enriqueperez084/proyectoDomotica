const express = require('express')
const message = require('../components/message/network')
const user = require('../components/user/network')
const chat = require('../components/chat/network')

const routes = function (server) { //Se hace la funcion principal para distribuir los request a los componentes correspondientes
    server.use('/message', message)
    server.use('/user', user )
    server.use('/chat', chat)
}

module.exports = routes