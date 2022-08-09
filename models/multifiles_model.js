const mongoose = require('mongoose')
const Schema = mongoose.Schema 


const MultiFiles = new Schema({
    name : {
        type: String
    },
    files : [Object]
})

module.exports = mongoose.model('multiFile' , MultiFiles)
