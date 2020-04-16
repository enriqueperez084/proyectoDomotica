const chalk = require('chalk')
const db = require('mongoose')
const connected = db.connection

db.Promise = global.Promise

async function connect(url) {
    db.connect(url, { useNewUrlParser: true })
    connected.on('error', console.error.bind(console, 'error de conexion'))
    connected.once('open', function () {
        console.log(`${chalk.green.bold('[db] Conectada con exito')}`)
    })
}

module.exports = connect
