const Model = require('./model')

function addStatus(status) {
    const myData = new Model(status)
    return myData.save()
}

module.exports = {
    add : addStatus
}