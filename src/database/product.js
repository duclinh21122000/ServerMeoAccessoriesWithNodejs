const mongoose = require('mongoose');

const Product = mongoose.Schema({
    nameSeller: String,
    nameProduct: String,
    price: String,
    address: String,
    category: String,
    description: String,
    image: String,
    imageSeller: String,
    createAt: String,
    titleNotification: String,
});

module.exports = mongoose.model('Product', Product);
