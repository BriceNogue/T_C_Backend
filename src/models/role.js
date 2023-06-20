const mongoose = require("mongoose")

const roleModel = mongoose.Schema({
    libelle :{
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Roles', roleModel);