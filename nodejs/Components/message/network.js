const express = require('express')
const multer = require('multer')
const response = require('../.././network/response')
const controller = require('./controller')
const router = express.Router()

const upload = multer({
    dest : 'public/files'
})


router.get('/prueba', function(req, res) { //Das una respuesta cuando pides una peticion get
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

router.get('/', function(req, res) {
    const filterMessages = req.query.user || null //Se obtiene el user
    controller.getMessage(filterMessages)
    .then((messageList) => {
        response.success(req, res, messageList, 200)
    })
    .catch(e => {
        response.error(req, res, 'Unexpected Error', 500, e)
    })
})


router.post('/',upload.single('file'), function (req, res) {
    controller.addMessage(req.body.chat, req.body.user, req.body.message, req.file)
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

router.patch('/:id', function(req, res) {
    console.log(req.params.id) //Se solicita el id

    controller.updateMessage(req.params.id, req.body.message)
        .then((data) => {
            response.success(req, res, data, 200 )
        })
        .catch( e => {
            response.error(req, res, 'Error interno', 500, e)
        })
})

router.delete('/:id', function(req, res) {
    controller.deleteMessage(req.params.id)
        .then(() => {
            response.success(req, res, `Usuario ${req.params.id} eliminado`,200)
        })
        .catch(e => {
            response.error(req, res, 'Error Interno', 500, e)
        })
})

module.exports = router