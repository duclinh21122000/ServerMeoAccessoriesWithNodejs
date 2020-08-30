const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');

const RouterUser = require("./src/route/User");
const RouterProduct = require("./src/route/Product");
const RouterComment = require("./src/route/Comment");

//Cấu hình thư mục public 
app.use(express.static(__dirname + "/public"));

//
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Kết nối mongoDB
const connectDB = require('./src/config/db');
connectDB();

//Cấu hình form gửi đi
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//routes app
app.use("/", RouterUser());
app.use("/", RouterProduct());
app.use("/", RouterComment());

//Khởi chạy server
app.listen(PORT, () => console.log(`App running on port ${PORT}`));