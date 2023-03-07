const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : [true , "Email is required for registering"],
        unique : [true , "Email already in use"]
    } ,

    username : {
        type : String,
        required : [true , "Username is a required field"],
        unique : [true , "Username must be unique"]
    } , 
    password : {
        type : "String",
        required : [true , "Password is necessary to register"],
        minlength : [6 , "Password must be atleast 6 characters"]
    } ,

    createdAt : {
        type : Date,
        default : new Date(Date.now())
    },
    updatePasswordToken : String,
    updatePasswordTokenExpiry : Date
})

module.exports = mongoose.model('User' , userSchema)