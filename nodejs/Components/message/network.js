const express = require('express')
const response = require('../.././network/response')
const controller = require('./controller')
const router = express.Router()


router.get('/', function(req, res) { //Das una respuesta cuando pides una peticion get
    console.log(req.headers) //Se leen los headers del request
    res.header({
        "custom-header" : "Nuestro header personalizado"
    })
    response.success(req, res, 'Respuesta personalizada para el get')
    //res.status(201).send('Hola desde get') //Tambien se puede responder con mensajes vacios y unicamente numeros de estado
})
router.get('/mensajesCoherentes', function(req, res) { //Das una respuesta cuando pides una peticion get
    console.log(req.headers) //Se leen los headers del request
    res.header({
        "custom-header" : "Nuestro header personalizado"
    })
    if (req.query.error == 'ok'){
        response.error(req, res, 'Mensaje de Error', 404, 'Este mensaje va por la consola del server para saber que hubo un error')
    } else {
        response.success(req, res, 'Respuesta personalizada para el get', 201) //Le voy a pasar los parametros para que me envie una respuesta propia y un status propio
        //res.status(201).send('Hola desde get') //Tambien se puede responder con mensajes vacios y unicamente numeros de estado
    }
})

router.get('/componenteMensaje', function(req, res) {
    controller.getMessage()
    .then((messageList) => {
        response.success(req, res, messageList, 200)
    })
    .catch(e => {
        response.error(req, res, 'Unexpected Error', 500, e)
    })
})


router.post('/componenteMensaje', function (req, res) {
    controller.addMessage(req.body.user, req.body.message)
    .then((fullMessage) => {
        response.success(req, res, fullMessage, 201)
    })
    .catch(e => {
        response.error(req, res, 'Informacion incompleta', 400, 'Error en los datos')
    })
    
})


router.post('/', function(req, res) { //Das una respuesta cuando pides una peticion post
    console.log(req.query) //Se lee el query por consola
    console.log(req.body) //Se lee el body por consola
    response.success(req, res, 'Respuesta personalizada para el post') //Manda a llamar el modulo response para procesar la peticion y enviar una respuesta personalizada sin necesidad de escribir tanto codigo
    
    
    //res.send('Hola desde post, el mensaje recibido es ' + req.body.text) //Se regresa el grupo text del body
})

module.exports = router