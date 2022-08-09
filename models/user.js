const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserModel = new Schema({
    name: {
        type: String,
    },
    lname: {
        type: String,
    },
    age: {
        type: String,
    },
    indorsement: [{
        fileId: {
            type: Schema.Types.ObjectId,
            ref: "File"
        },
        indorsementIdInterface: {
            type: Schema.Types.ObjectId,
            ref: "Time"
        },
        expire: {
            type: Date
        }
    }]
})

module.exports = mongoose.model('User', UserModel);