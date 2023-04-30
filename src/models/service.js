const mongoose = require("mongoose");

const serviceModel = mongoose.Schema({
    service_code: {
        type: String,
        require: true,
        unique: true,
        dropDups: true
    },
    libelle: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    }
},{strict: true});

module.exports = mongoose.model('Services', serviceModel);