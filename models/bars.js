const mongoose = require('mongoose')

const barSchema = new mongoose.Schema({
    name: {type: String, required: true},
    address: {type: String, required: true},
    hours: {type: String, required: true},
    hasHappyHour: {type: checkbox, required: true},
    happyHourTime: {type: String, required: true},
    description: String,
    img: String
})

const Bar = mongoose.model('Bar', barSchema)

module.exports = Bar