const Comment = require('../database/comment');
const Chat = require('../database/chat');

exports.add_comment = (req, res) => {
    new Comment({
        id_product: req.body.id_product,
        comment: req.body.comment,
        user: req.body.user,
        image_user: req.body.image_user,
        title_notification: "đã bình luận về bài viết",
        create_at: req.body.create_at
    }).save((err) => {
        if (err) {
            console.log(err);
            return;
        } else {
            res.send({
                status: true,
                message: "Bình luận",
            });
        }
    });
}

exports.getAll_Comment = async (req, res) => {
    try {
        let comments = await Comment.find()
            .lean();
            comments.reverse();
        res.send({
            status: true,
            data: comments,
        });
    } catch (error) {
        res.send({
            status: false,
            message: "Error load data"
        });
        console.log(error);
    }
}

exports.get_comment_byID_Product = (req, res) => {
    Comment.find()
    .lean()
    .exec((error, data) => {
        let datas = data.filter((data) => {
            return data.id_product === req.body.id_product;
        })
        res.send({
            status: true,
            data: datas
        })
        if (error) {
            log(error);
        }
    })
}

exports.delete_comment_byID_Product = async(req, res) => {
    const comments = await Comment.deleteMany({id_product: [req.body.id_product]});
    if(comments){
        res.send({
            status: true,
            message: "Xoá sản phẩm thành công",
        });
    } else {
        res.send({
            status: false,
            message: "Xoá sản phẩm không thành công",
        });
    }
}

exports.send_messenger = (req, res) => {
    new Chat({
        id_product: req.body.id_product,
        admin: req.body.admin,
        user: req.body.user,
        image_admin: req.body.image_admin,
        image_user: req.body.image_user,
        messenger : req.body.messenger,
        create_at: req.body.create_at
    }).save((err, data) => {
        if (err) {
            console.log(err);
            return;
        } else {
            res.send({
                status: true,
                message: "Đã gửi tin nhắn",
                data: [data]
            });
        }
    });
}

exports.getAll_Messenger = async (req, res) => {
    try {
        let messengers = await Chat.find()
            .lean();
            messengers.reverse();
        res.send({
            status: true,
            data: messengers,
        });
    } catch (error) {
        res.send({
            status: false,
            message: "Error load data"
        });
        console.log(error);
    }
}




