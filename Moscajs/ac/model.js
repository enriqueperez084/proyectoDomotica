const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const mySchema = new Schema({
  teacher: String,
  date: String,
  time: String,
  status: String, //Encendido o Apagado
});

const model = mongoose.model("AC", mySchema);
module.exports = model;
