const mongoose = require('mongoose')

const Schema = mongoose.Schema

const mySchema = new Schema({ //Se crea un esquema especifico para guardar los datos en el chat
    user : String, //Asi se define que tipo de dato va a llegar a la base de datos y evitamos que llegue cualquier otro tipo de dato
    message : {
        type : String, //De esta manera se filtra la informaciond de una manera mas precisa evitando que entre algun otro tipo de informacion que no sea un String
        required : true, //Evita que el mensaje sea undefined
    },
    date: Date,
})

const model = mongoose.model('Message', mySchema)
module.exports = model
