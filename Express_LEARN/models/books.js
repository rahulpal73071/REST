const mongoose = require('mongoose');

const booksSchema = new mongoose.Schema({
    title:{type:String , required:true , unique:true},
    author:{type:String , required:true},
    url:{type:String , required:true},
    description:{type:String , required:true},
    isAvailable:{type:Boolean , default:true},
    price:{type:Number , required:true},
    image:String,
} , {timestamps:true});

module.exports = mongoose.model('Books' , booksSchema);