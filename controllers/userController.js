const User = require("../models/user")
const bcrypt = require('bcryptjs')
const cookieToken = require("../utils/cookieTOken")

exports.register = async(req,res) => {
    
    try {
        const {email , password , username} = req.body
        const encryptedPassword = await bcrypt.hash(password , 10)
        const user = await User.create({
            username,email, password: encryptedPassword
        })
        
        cookieToken(res,user)


    } catch(err) {
        return res.json({
            error : err.message
        })
    }
}

exports.login = async(req,res) => {
    try {

        const {email , password} = req.body

        if(!(email || password)){
            return res.status(400).json({
                message : "Email or password not given"
            })
        }
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                message : "Email or Password is incorrect"
            })
        }
        if(! await bcrypt.compare(password , user.password)){
            
            return res.status(400).json({
                message : "Email or Password is incorrect"
            })
        }
        
        cookieToken(res, user)
    } catch(err) {
        return res.status(500).json({
            message : `Something went wrong: ${err.message}`
        })
    }
}

exports.logout = async(req,res) => {
    try {
        res.cookie("token" , null , {
            expires : new Date(Date.now()),
            httpOnly : true
        })

        res.status(200).json({
            success : true,
            message : "You are successfully logged out"
        })
    } catch(err) {
        return res.status(500).json({
            message : `Something went wrong in logging you out: ${err.message}`
        })
    }
}

exports.changePassword = async(req,res) => {
    try {
        let id = req.user.id;
        let {oldPassword , newPassword} = req.body

        let user = await User.findById(id)

        if(!bcrypt.compare(oldPassword , user.password)){
            return res.status(401).json({
                message : "Old password is not matching"
            })
        }

        user.password = req.password.newPassword

        await user.save({validateBeforeSave : false})

        res.status(200).json({
            success : true,
            message : "Password changed successfully",
            user
        })
    } catch(err) {
        return res.status(500).json({
            message : "Something went wrong in changing password"
        })
    }
}