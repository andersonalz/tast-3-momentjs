const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataFileModel = new Schema ({
    date : {
        type : String,
        enum : ["Day" ,"Month"]
    },
    counter : {
        type : String,
        default : 10 
    },
    name : {
        type : String,
    }
})
module.exports = mongoose.model('Time', dataFileModel);