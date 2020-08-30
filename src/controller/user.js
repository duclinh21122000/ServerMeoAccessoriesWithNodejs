const User = require('../database/user');
const hash_pwd = require('../config/hash_pass');
const nodemailer = require('nodemailer');

exports.register_user = (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) return done(err);
        if (user) {
            return res.send({
                status: false,
                message: 'Tài khoản đã tồn tại',
            });
        } else {
            new User({
                fullName: req.body.fullName,
                email: req.body.email,
                password: hash_pwd.hash_input(req.body.password),
                phone: "",
                address: "",
                image: "no image",
                permission: false,
                isActive: false,
            }).save((err, datas) => {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    res.send({
                        status: true,
                        message: "Đăng ký tài khoản thành công",
                        data: datas,
                    })
                }
            });
        }
    });
}

exports.verify_email = (req, res) => {
    let code = Math.floor((Math.random() * 9999) + 3000);
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'duongduclinh2207@gmail.com',
            pass: 'duongduclinh123',
        },

    });
    var mainOptions = {
        from: 'Mèo Accessories',
        to: req.body.email,
        subject: code + ' là mã xác thực đăng ký tài khoản của bạn',
        text: "Abc",
        html: "<h2>Xin chào bạn,</h2><h2>Chúng tôi đã nhận được yêu cầu đăng ký tại khoản của bạn.Nhập mã xác thực tài khoản sau đây:</h2><h1>" + code + "</h1>"
    }

    transporter.sendMail(mainOptions, (err, info) => {
        if (err) {
            console.log(err);
            res.send({
                status: false,
                message: "Gửi mail thất bại"
            });
        } else {
            res.send({
                status: true,
                message: code,
            })
        }
    });
}

exports.update_isActive = async(req, res) => {
    await User.findOneAndUpdate({ email: req.body.email }, {
        isActive: true,
    }, (err, doc) => {
        if (err) {
            res.send({
                status: false,
                message: "Xác thực tài khoản không thành công",
            });
        } else {
            res.send({
                status: true,
                message: "Xác thực tài khoản thành công",
            })
        }
    });
}

exports.get_token = async (req, res) => {
    try {
        const AccountInfo = await User.findOne({ email: req.body.email });
        if (AccountInfo.permission) {
            User.find()
                .lean()
                .exec((error, data) => {
                    res.send({ ...AccountInfo._doc })
                    if (error) {
                        log(error);
                    }
                });
        } else {
            let data = [{ data: null }];
            res.send({ ...AccountInfo._doc })
        }
    } catch (error) {

    }
}

exports.get_account_user = async (req, res) => {
    try {
        const AccountInfo = await User.findOne({ email: req.body.email });
        if (AccountInfo.permission) {
            User.find()
                .lean()
                .exec((error, data) => {
                    let datas = data.filter((data) => {
                        return data.permission == false
                    });
                    datas.reverse()
                    res.send({
                        status: true,
                        data: datas
                    })
                    if (error) {
                        log(error);
                    }
                });
        } else {
            let data = [{ data: null }];
            res.send({ ...AccountInfo._doc, data })
        }
    } catch (error) {

    }
}

exports.login_user = async (req, res) => {
    try {
        await User.findOne({ email: req.body.email }, (err, user) => {
            if (err) return done(err);
            if (!user) {
                res.send({
                    status: false,
                    message: "Tài khoản không tồn tại",
                });
            } else if (hash_pwd.hash_output(user.password) != req.body.password) {
                res.send({
                    status: false,
                    message: "Mật khẩu không đúng",
                });
            } else {
                res.send({
                    status: true,
                    message: "Đăng nhập thành công",
                    data: user,
                });
            }
        });
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getAll_User = async (req, res) => {
    try {
        let users = await User.find()
            .lean();
        res.send({
            status: true,
            user: users,
        });
    } catch (error) {
        res.send({
            status: false,
            message: "Error load data"
        });
        console.log(error);
    }
};


exports.update_user_by_email = async(req, res) => {
    await User.findOneAndUpdate({ email: req.body.email }, {
        fullName: req.body.fullName,
        phone: req.body.phone,
        address: req.body.address,
        image: req.file.originalname,
    }, (err, doc) => {
        if (err) {
            res.send({
                status: false,
                message: "Chỉnh sửa tài khoản không thành công",
            });
        } else {
            res.send({
                status: true,
                message: "Chỉnh sửa tài khoản thành công",
            });
        }
    });
}

exports.delete_user_by_email = async (req, res) => {
    const user = await User.findOneAndDelete({email: req.body.email});
    if(user){
        res.send({
            status: true,
            message: "Xoá tài khoản thành công",
        });
    } else {
        res.send({
            status: false,
            message: "Xoá tài khoản không thành công",
        });
    }
}

exports.change_password = (req, res) => {
    User.findOne({email: req.body.email}, (err, user) => {
        if (err) return done(err);
        if (hash_pwd.hash_output(user.password) == req.body.password) {
            res.send({
                status: true,
                message: "Mật khẩu đúng",
            });
        } else {
            res.send({
                status: false,
                message: "Mật khẩu không đúng",
            });
        }
    });
}

exports.reset_password = async (req, res) => {
    await User.findOneAndUpdate({ email: req.body.email }, {
        password: hash_pwd.hash_input(req.body.password)
    }, (err, doc) => {
        if (err) {
            res.send({
                status: false,
                message: "Đổi mật khẩu thất bại",
            });
        } else {
            res.send({
                status: true,
                message: "Đổi mật khẩu thành công",
            })
        }
    });
};

exports.send_mail = (req, res) => {
    let code = Math.floor((Math.random() * 9999) + 3000);
    console.log(code);
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'duongduclinh2207@gmail.com',
            pass: 'duongduclinh123',
        },

    });

    var mainOptions = {
        from: 'Mèo Accessories',
        to: req.body.email,
        subject: code + ' là mã khôi phục tại khoản của bạn',
        text: "Abc",
        html: "<h2>Xin chào bạn,</h2><h2>Chúng tôi đã nhận được yêu cầu đặt lại mật khẩu ứng dụng của bạn.Nhập mã đặt lại mật khẩu sau đây:</h2><h1>" + code + "</h1>"
    }

    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) return done(err);
        if (user) {
            transporter.sendMail(mainOptions, (err, info) => {
                if (err) {
                    console.log(err);
                    res.send({
                        status: false,
                        message: "Gửi mail thất bại"
                    });
                } else {
                    res.send({
                        status: true,
                        message: code,
                    })
                }
            });
        } else {
            res.send({
                status: false,
                message: "Email chưa được đăng ký",
            });
        }
    });
}

