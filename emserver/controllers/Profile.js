const Group = require("../models/Group")
const Profile = require("../models/Profile")
const User = require("../models/Profile")
const { uploadImageToCloudinary } = require("../utils/imageUploaders")
const mongoose = require("mongoose")




exports.updateProfile = async(req,res)=>{
    try{
        const {
            firstName = "",
            lastName = "",
            dateOfBirth = "",
            about = "",
            contactNumber = "",
            gender = "",
          } = req.body
          const id =req.user.id
          const userDetails = await User.findById(id)
          const profile = await Profile.findById(userDetails.additionalDetails)
          const user = await User.findByIdAndUpdate(id,{
            firstName,
            lastName
          })
          await user.save()

          profile.dateOfBirth = dateOfBirth
          profile.about = about
          profile.contactNumber = contactNumber
          profile.gender= gender

          await profile.save()

          const updatedUserDetails = await User.findById(id).populate("additionalDetails").exec()

          return res.status(200).json({
            success:true,
            message:"Profile updated successfully",
            updatedUserDetails

          })
    }catch(error){
        return res.status(404).json({
            success:false,
            message:"failed to update profile",
            error:error.message
        })
    }
}

exports.deleteAccount = async(req,res)=>{
    try{
      const userId = req.user.id
      const user = await User.findById(userId)
      if(!user){
        return res.status(402).json({
            success:false,
            message:"User not found"
        })
      }
    await Profile.findByIdAndDelete({
        _id:new mongoose.Types.ObjectId(user.additionalDetails)
    })
    for(const groupId of groups){
        await Group.findByIdAndUpdate(groupId,{$pull:{users:userId}},{new:true})
    }
    await User.findByIdAndDelete({_id:userId})
    return res.status(200).json({
        success:true,
        message:"User deleted successfully"
    })
    }catch(error){
        return res.status(404).json({
            success:false,
            message:"failed to delete the account"
        })
    }
}

exports.getAllUserDetails = async(req,res)=>{
    try{
     const userId = req.user.id;
     const user= await User.findById(userId).populate("additionalDetails").exec()

     return res.status(200).json({
        success:true,
        message:"User Details Find Successfully"
     })
    }catch(error){
        return res.status(404).json({
            success:false,
            message:"failed to fetch the user details",
            error:error.message

        })
    }
}

exports.updateDisplayPicture=async(req,res)=>{
    try{
       const displayPicture = req.files.displayPicture
       const userId = req.user.id
       const image = await uploadImageToCloudinary(displayPicture,process.env.FOLDER_NAME,
        1000,
        1000
       )
       const updatedProfile =await User.findByIdAndUpdate(
        {_id:userId},
        {image:image.secure_url},
        {new:true}
       )

       return res.status(200).json({
        success:true,
        message:"image updated successfully",
        data:updatedProfile
       })
    }catch(error){
        return res.status(404).json({
            success:false,
            message:"failed to update the profile picture"
        })
    }
}