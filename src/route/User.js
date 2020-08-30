const express = require('express');
const router = express.Router();
const upload = require('../config/multer');

//controller
const controllerUser = require('../controller/user');

const User = () => {
    router.post("/api/get-token-account", controllerUser.get_token);
    router.post("/api/register-account", controllerUser.register_user);
    router.post("/api/verify_email", controllerUser.verify_email);
    router.post("/api/update_isActive", controllerUser.update_isActive);
    router.post("/api/login-account", controllerUser.login_user);
    router.get("/api/getAllUser", controllerUser.getAll_User);
    router.post("/api/get_account_user", controllerUser.get_account_user);
    router.post("/api/send_email", controllerUser.send_mail);
    router.post("/api/reset_password", controllerUser.reset_password);
    router.post("/api/change_password", controllerUser.change_password);
    router.post("/api/update_user", upload.single("upload"), controllerUser.update_user_by_email);
    router.post("/api/delete_user", controllerUser.delete_user_by_email);
    return router;
}

module.exports = User;