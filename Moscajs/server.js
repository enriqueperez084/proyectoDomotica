'use strict'

const mosca = require('mosca')
const chalk = require('chalk')

/*const mongo = require('mongo')

const backend = {
  type: 'mongo',
  url: 'mongodb://admin:admin@localhost:27017/platziverse-mqtt?authSource=admin',
  mongo,
  return_buffers: true
}*/
const pubsubsettings = {
    type: 'mongodb',
    //url: "mongodb+srv://db_user_1:wiPHUJh9Fj0drytL@cluster0-dtp5z.mongodb.net/test?retryWrites=true&w=majority",
    //pubsubCollection: 'ascoltatori',
    mongo: {},
    return_buffers: true
}

const moscaSettings = {
    port: 1883,
    backend: pubsubsettings
}
const server = new mosca.Server(moscaSettings)
const clients = new Map()

server.on('clientConnected', client => {
    console.log(`${chalk.black.bgGreen.bold('Cliente Conectado:')} ${client.id}`)
    clients.set(client.id, null)
})

server.on('clientDisconnected', client => {
    console.log(`${chalk.bgRed.bold('Cliente Desconectado:')} ${client.id}`)
})

server.on('published', (packet, client) => {
    console.log(`${chalk.magenta.underline('Recibido de:')} ${packet.topic}`)
    switch (packet.topic) {
        case 'esp32/test':
            //server.publish(message)
            break
        case 'test/message':
            //console.log('Se recibio un mensaje de test/message')
            console.log(`${chalk.magenta.underline('Payload:')} ${packet.payload}`)
            break
    }

})

server.on('ready', () => {
    console.log(`${chalk.green('[Mosca Server]')} Server iniciado y corriendo`)
})

server.on('error', handleFatalError)

function handleFatalError(err) {
    console.error(`${chalk.red('[Fatal error]')} ${err.message}`)
    console.error(err.stack)
    process.exit(1)
}

process.on('uncaughtException', handleFatalError) //Manejador de excepciones no contempladas
process.on('unhandledRejection', handleFatalError) //Rejects de promesas no contempladas

var message = {
    topic: 'test/message',
    payload: 'Prueba desde Node.js',
    qos: 0,
    retain: false
}
