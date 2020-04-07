const db = require('mongoose')
const Model = require('./model')

//mongodb+srv://db_user_1:<password>@cluster0-dtp5z.mongodb.net/test
db.Promise = global.Promise //Se asegura que utilice la libreria nativa de promesas
db.connect('mongodb+srv://db_user_1:wiPHUJh9Fj0drytL@cluster0-dtp5z.mongodb.net/chat_nodejs_db', {
    useNewUrlParser: true,
})
console.log('[db] Conectada con exito')
function addMessage(message) {
     //list.push(message)
     const myMessage = new Model(message) //Se agrega el mensaje al modelo y se guarda en la base de datos
     myMessage.save()
}

async function getMessages() {
     //return list
     const messages = await Model.find() //Se solicitan los mensajes de manera asincrona
    return messages
}

module.exports = {
    add: addMessage,
    list: getMessages
    //get
    //update
    //delete
}