const mongoose = require('mongoose');

const URI = "mongodb+srv://dbmeostorepk:duclinh123@cluster0.zomp5.mongodb.net/dbadmin?retryWrites=true&w=majority";

const connectDB = async () =>{
    const conn = await mongoose.connect(URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
};
module.exports = connectDB;

