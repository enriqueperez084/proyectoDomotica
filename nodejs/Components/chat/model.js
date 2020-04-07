const mongoose = require('mongoose')

const Schema = mongoose.Schema

const mySchema = new Schema({ //Se crea un esquema especifico para guardar los datos en el chat
    user: {
        type: Schema.ObjectId,
        ref: 'User',
    }
})

const model = mongoose.model('Chat', mySchema) //Se define que el modelo sera message y que tendra el formato de mySchema
module.exports = model
