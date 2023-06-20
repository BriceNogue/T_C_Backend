const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userModel = new Schema({
    user_code: {
        type: String,
        require: true,
        unique: true,
        dropDups: true
    },
    first_name: {
        type: String,
        require: true
    },
    last_name: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    service_id: {
        type: Schema.Types.ObjectId,
        ref: 'Service'
    },
    role: {
        type: String,
        required: false,
    },
    /*service: {
        type: String,
        require: true,
    },*/
    phone: {
        type: String,
        require: true
    },
    picture: {
        type: String,
        require: false
    },
    password: {
        type: String,
        require: true
    }

}, { strict: true });

userModel.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, null, null, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    })
});

userModel.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('Users', userModel);