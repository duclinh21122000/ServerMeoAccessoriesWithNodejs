const mongoose = require('mongoose');

const Chat = mongoose.Schema({
    id_product: String,
    admin: String,
    user: String,
    image_admin: String,
    image_user: String,
    messenger: String,
    create_at: String
});

module.exports = mongoose.model('Chat', Chat);