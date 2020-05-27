"use strict";

// const express = require("express");
// const app = express();
// const serverWs = require("http").Server(app);
// const io = require("socket.io")(serverWs);

// app.use(express.static("public"));

// io.on("connection", function (socket) {
//   console.log("Nuevo cliente conectado");
//   socket.emit("mensaje", "BIENVENIDO");
// });

// serverWs.listen(8080, function () {
//   console.log("Servidor Ws iniciado en http://localhost:8080");
// });

const url =
  "mongodb+srv://db_user_1:wiPHUJh9Fj0drytL@cluster0-dtp5z.mongodb.net/chat_nodejs_db";
const db = require("./db");
const mosca = require("mosca");
const router = require("./routes");
const chalk = require("chalk");

db(url);

const backend = {
  type: "mongodb",
  url: url,
  mongo: {},
  return_buffers: true,
};

const moscaSettings = {
  http: {
    port: 4000,
    bundle: true,
    static: "./",
  },
  backend,
};

const server = new mosca.Server(moscaSettings);
const clients = new Map();

server.on("clientConnected", (client) => {
  console.log(`${chalk.black.bgGreen.bold("Cliente Conectado:")} ${client.id}`);
  clients.set(client.id, null);
});

server.on("clientDisconnected", (client) => {
  console.log(`${chalk.bgRed.bold("Cliente Desconectado:")} ${client.id}`);
});

server.on("published", (packet, client) => {
  console.log(`${chalk.magenta.underline("Recibido de:")} ${packet.topic}`);
  router(packet, client);
});

server.on("ready", () => {
  console.log(`${chalk.green("[Mosca Server]")} Server iniciado y corriendo`);
});

server.on("error", handleFatalError);

function handleFatalError(err) {
  console.error(`${chalk.red("[Fatal error]")} ${err.message}`);
  console.error(err.stack);
  process.exit(1);
}

process.on("uncaughtException", handleFatalError); //Manejador de excepciones no contempladas
process.on("unhandledRejection", handleFatalError); //Rejects de promesas no contempladas

var message = {
  topic: "test/message",
  payload: "Prueba desde Node.js",
  qos: 0,
  retain: false,
};
