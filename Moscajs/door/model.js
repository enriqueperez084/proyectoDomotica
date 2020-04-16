const mongoose = require('mongoose')

const Schema = mongoose.Schema

const mySchema = new Schema({
    teacher : String,
    date : String,
    time : String,
    status : String //Abierto o Cerrado
})

const model = mongoose.model('Door', mySchema)
module.exports = model
