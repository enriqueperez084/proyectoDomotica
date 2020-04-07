const db = require('mongoose')
db.Promise = global.Promise //Se asegura que utilice la libreria nativa de promesas
const url = 'mongodb+srv://db_user_1:wiPHUJh9Fj0drytL@cluster0-dtp5z.mongodb.net/chat_nodejs_db'
async function connect(url) {
   db.connect(url, {
    useNewUrlParser: true,
})
console.log('[db] Conectada con exito') 
}
//mongodb+srv://db_user_1:<password>@cluster0-dtp5z.mongodb.net/test

module.exports = connect