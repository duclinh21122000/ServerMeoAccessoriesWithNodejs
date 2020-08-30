const mongoose = require('mongoose');

const Comment = mongoose.Schema({
    id_product: String,
    comment: String,
    user : String,
    image_user: String,
    title_notification: String,
    create_at: String
});

module.exports = mongoose.model('Comment', Comment);
