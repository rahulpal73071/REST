const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{type:String , required:true},
    email:{type:String , required:true , unique:true},
    age:Number
} , {timestamps:true})

module.exports = mongoose.model('User' , UserSchema);