const express = require('express');
const router = express.Router();

const controllerComment = require("../controller/comment");

const Comment = () => {
    router.post("/api/add_comment", controllerComment.add_comment);
    router.post("/api/get_comment_byID", controllerComment.get_comment_byID_Product);
    router.get("/api/get_all_comment", controllerComment.getAll_Comment);
    router.post("/api/delete_comment_byID", controllerComment.delete_comment_byID_Product);
    //
    router.post("/api/send_messenger", controllerComment.send_messenger);
    router.get("/api/get_all_messenger", controllerComment.getAll_Messenger);
    return router;
}

module.exports = Comment;