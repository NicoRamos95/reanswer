const mongoose = require('mongoose')

const carSchema = new mongoose.Schema({
    model: String,
    patent: String,
    color: String,
    repair:[{description: String, date: { type: Date, default: Date.now },}],
    clientId: { type: mongoose.Schema.ObjectId, ref: 'client'}
})

const Car = mongoose.model('car', carSchema)

module.exports = Car