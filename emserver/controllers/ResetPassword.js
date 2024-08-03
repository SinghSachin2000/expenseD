const User = require("../models/User")
const passwordUpdated = require("../mail/templates/passwordUpdate")
const bcrypt = require("bcrypt")
const mailSender = require("../utils/mailSender")

exports.changePassword = async(req,res)=>{
    try{
    const userId = req.user.id
    if(!userId){
        return res.status(402).json({
            success:false,
            message : "user not found. Please login first"
        })
    }
    const userDetails = await User.findById(userId);
    if(!userDetails){
        return res.status(402).json({
            success:false,
            message:"User Not Found"
        })
    }
    
    const {oldPassword,newPassword} = req.body

    if(!oldPassword ||!newPassword){
        return res.status(402).json({
            success:false,
            message:"all fields are required"
        })
    }
    
    const isMatched = await bcrypt.compare(oldPassword,userDetails.password);
    if(!isMatched){
        return res.status(403).json({
            success:false,
            message:"the password is incorrect"
        })
    }
   const hashedPassword = await bcrypt.hash(newPassword,10);
    const updatePassword  = await User.findByIdAndUpdate(userDetails._id,{
        $set:{
            password:hashedPassword
        }
    },{new:true})

    try{
      const emailResponse = await mailSender(updatePassword.email,"Password for your account has been updated",passwordUpdated(updatePassword.email,`Password updated successfully for ${updatePassword.firstName} ${updatePassword.lastName}`))
      console.log("Email sent successfully",emailResponse)

    }catch(error){
    return res.status(404).json({
        success:false,
        message:"Error occurred while sending Email"
    })
    }
    return res.status(200).json({
        success:true,
        message:"Password updated successfully"
    })
    }catch(error){
     return res.status(500).json({
        success:false,
        message:"Error occurred while updating password",
        error:error.message
     })
    }
}

exports.resetPasswordToken =async(req,res)=>{
    try{
     const email=req.body.email
     const user = await User.findOne(email);
     if(!user){
        return res.status(402).json({
            success:false,
            message:"user not found!!"
        })
     }
     const token = crypto.randomBytes(20).toString("hex")
     const updateDetails = await User.findOneAndUpdate({eamil:email},{token:token,
        resetPasswordToken:Date.now()
     },{new:true})

     console.log("DETAILS", updatedDetails)
     const url = `http://localhost:3000/update-password/${token}`
     await mailSender(email,"Password reset", `Your Link for email verification is ${url}. Please click this url to reset your password.`)

     res.json({
        success:true,
        message: "Email Sent Successfully, Please Check Your Email to Continue Further"
     })
    }catch(error){
        return res.status(404).json({
            success:false,
            message:"failed to reset the password",
            error:error.message
        })
    }
}

exports.resetPassword =async(req,res)=>{
    try{
      const {password,confirmPassword,token}=req.body
      if(confirmPassword !==password){
        return res.status(402).json({
            success:false,
            message:'Password and Confirm Password Does not Match'
        })
      }
      const userDetails = await User.findOne({ token: token })
      if (!userDetails) {
        return res.json({
          success: false,
          message: "Token is Invalid",
        })
      }
      if (!(userDetails.resetPasswordExpires > Date.now())) {
        return res.status(403).json({
          success: false,
          message: `Token is Expired, Please Regenerate Your Token`,
        })
      }
      const encryptedPassword = await bcrypt.hash(password, 10)
      await User.findOneAndUpdate(
        { token: token },
        { password: encryptedPassword },
        { new: true }
      )
      res.json({
        success: true,
        message: `Password Reset Successful`,
      })
    }catch(error){
        return res.status(404).json({
            success:true,
            message:"Some Error in Updating the Password"
        })
    }
}