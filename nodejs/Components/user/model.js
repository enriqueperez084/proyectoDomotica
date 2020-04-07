const mongoose = require('mongoose')

const Schema = mongoose.Schema

const mySchema = new Schema({ //Se crea un esquema especifico para guardar los datos en el chat
    name: String,
    
});

const model = mongoose.model('User', mySchema) //Se define que el modelo sera message y que tendra el formato de mySchema
module.exports = model
