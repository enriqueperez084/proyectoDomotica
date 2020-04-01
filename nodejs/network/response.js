exports.success = function (req, res, message, status) {
    res.status(status || 200).send({
        error: '',
        body: message})
}

exports.error = function (req, res, message, status, details) {
    console.error('[response error]' + details) //Se va enviar el error en la consola del server
    res.status(status || 400).send({
        error: message,
        body: ''})
}