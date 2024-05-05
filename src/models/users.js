const mongoose = require('mongoose');
const validator = require('validator');

const userchema = new mongoose.Schema({

    username : {
        type:String,
        required:false,
    },
    name : {
        type:String,
        required:false,
    },
    password : {
        type:String,
        required:false,
    },
    email:{
        type:String,
       required:true,
        unique:[true,"Email already present!"],
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email");
            }
        }
    },
    phone:{
        type:Number,
        required:false,
    },
    country : {
        type:String,
        required:false,
    },
    address : {
        type:String,
        required:false,
    },
    role : {
        type:String,
        required:false,
    },
    gender : {
        type:String,
        required:false,
    }
});
// we will  create a new collection
const user = new mongoose.model('user',userchema);

module.exports = user;