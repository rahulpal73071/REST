const mongoose = require('mongoose');

const authySchema = new mongoose.Schema({
    name:{type:String , required:true},
    email:{type:String , required:true , unique:true},
    password:{type:String , required:true},
    roll:{type:String , default:'user'},
} , {timestamps:true});

module.exports = mongoose.model('Authy' , authySchema);