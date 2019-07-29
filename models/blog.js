const mongoose = require('mongoose')

const Blogdata = mongoose.Schema({
    judul:String,
    deskripsi:String,
    artikel:String,
    file:String,
    date:Date
})

module.exports= mongoose.model('blogdata',Blogdata)