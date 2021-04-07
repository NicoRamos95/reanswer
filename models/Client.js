const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String
})

const Client = mongoose.model('client', clientSchema)

module.exports = Client