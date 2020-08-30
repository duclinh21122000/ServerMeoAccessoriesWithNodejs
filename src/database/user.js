const mongoose = require('mongoose');

const User = new mongoose.Schema({
    fullName: String,
    email: {type: String, unique: true},
    password: String,
    phone: String,
    address: String,
    image: String,
    permission: Boolean,
    isActive: Boolean,
});

module.exports = mongoose.model('User', User);