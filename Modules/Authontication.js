const mongoose = require('mongoose');

const user = new mongoose.Schema({
    name :{
        type : String,
        required : true
    },
    email: {
        type : String,
        required : true,
        index: true, 
        unique: true
    },
    phone : {
        type : String,
        required : true,
        unique: true
    },
    password : {
        type : String,
        required : true
    }

});

module.exports = mongoose.model('Users', user);