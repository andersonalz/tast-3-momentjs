const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const fileModel = new Schema ({
    name : {
        type : String,
    },
    path : {
        type : String,
    },
    type : {
        type : String,  
    },
    size : {    
        type : Number,
    },
    indorsement:{
        type : String,
        enum: ["Driving licence","Health certificate","Certificate of non-addiction","Certificate of employment"],
        default : "Driving licence"
    }, 
    createdAt : {
        type : String,
        default : moment().format()
    }
})

module.exports = mongoose.model('File', fileModel);