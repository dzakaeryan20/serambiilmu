const mongoose = require('mongoose')

const userData = mongoose.Schema({
    username:String,
    password:String
})

module.exports = mongoose.model('userData',userData)