const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    ipaddress: {
        type: String,
        required: true,
    },
}, { versionKey: false });

module.exports = mongoose.model('User', userSchema);