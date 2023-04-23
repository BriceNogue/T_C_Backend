const mongoose = require("mongoose");

const userModel = mongoose.Schema({
    user_code:{
        type: String,
        require: true
    },
    first_name:{
        type: String,
        require: true
    },
    last_name:{
        type: String,
        require: true
    },
    address:{
        type: String,
        require: true
    },
    service:{
        type: String,
        require: true
    },
    phone:{
        type: String,
        require: true
    },
    picture:{
        type: String,
        require: false
    },
    password:{
        type: String,
        require: true
    }

});

module.exports = mongoose.model('Users', userModel);