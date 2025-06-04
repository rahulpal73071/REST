const mongoose = require('mongoose');
require('dotenv').config();
const MYDB = async ()=>{
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log("connected to DataBase");
        
    } catch (error) {
        console.log(error.message);
        process.exit(1);
        
    }
}

module.exports = MYDB;