const Model = require('./model')

function addUser(user){
    const myUser = new Model(user)
    return myUser.save()
}

async function getNames(filterName) {
    let filter = {}
    if (filterName !== null) {
        filter = { name : filterName}
    }
    const names = await Model.find(filter)
    return names
}
module.exports = {
    add: addUser,
    list : getNames,

}