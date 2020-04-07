const store = require('./store')

function addMessage(chat, user, message, file) {
    return new Promise((resolve, reject) => {
        if (!chat || !user || !message) {
            console.error('[messageController] No hay usuario, mensaje o chat')
            reject('Los datos son incorrectos')
            return false
        }
        let fileUrl = ''
        if (file) {
            fileUrl = 'http://localhost:3000/app/public/files/' + file.filename
        }
        const fullMessage = {
            chat: chat,
            user: user,
            message: message,
            date: new Date(),
            file : fileUrl,
        }

        store.add(fullMessage)
        resolve(fullMessage)
    })

}
function getMessage(filterUser) {
    return new Promise((resolve, reject) => {
        resolve(store.list(filterUser))
    })
}
function updateMessage(id, message) {
    return new Promise( async (resolve, reject) => {
        if (!id || !message){
            reject('Invalid data')
            return false
        }
        const result = await store.updateText(id, message)
        resolve(result)
    })
}

function deleteMesage(id) {
    return new Promise((resolve, reject) =>{
        if (!id) {
            reject('Id invalido')
            return false
        }
        store.remove(id)
            .then(() => {
                resolve()
            })
            .catch(e => {
                reject(e)
            })
        })
}
module.exports = {
    addMessage,
    getMessage,
    updateMessage,
    deleteMesage,
}