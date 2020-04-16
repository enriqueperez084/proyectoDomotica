const store = require('./store')

function changeStatus(packet, client) {
    const status = {
        teacher: client.id,
        date : new Intl.DateTimeFormat('en-GB').format(new Date()),
        time: new Date().toTimeString().replace(/ \G..+/, ''),
        status: packet.payload
    }
    //console.log(`El ciente es ${client.id}`)
    return store.add(status)
}
module.exports = {
    changeStatus
}