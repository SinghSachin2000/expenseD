
const Group = require("../models/Group");
const User = require("../models/User");
const Card = require("../models/Card");
const { uploadImageToCloudinary } = require("../utils/imageUploaders");

// Create a new group, add members, and create a card
exports.createGroup = async (req, res) => {
try{
    const { name, description} = req.body;
    const userId= req.user.id  
    const image = req.files.image

    if(!name|| !description || !image){
        return res.status(403).Send({
            success:false,
            message:"All Fields are required"
          })
    }
    const userCreatedGroup = await User.findById(userId);
    if(!userCreatedGroup){
        return res.status(404).json({
            success: false,
            message: "user Details Not Found",
          })
    }
    const imageOfGroup = await uploadImageToCloudinary(image,
        process.env.FOLDER_NAME
    )
    console.log(imageOfGroup)

    const newGroup = await Group.create({
      name,
      description,
      image: imageOfGroup.secure_url,
      users :[userId],
    });

await User.findByIdAndUpdate({_id:userId},{
    $push:{
        group : newGroup._id,
    },
},{new:true})

res.status(200).json({
    success: true,
    data: newGroup,
    message: "Group Created Successfully",
  })
}catch(error){
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to create Group",
      error: error.message,
    })
}
};

exports.editGroup = async (req,res)=>{
    try{
const {groupId}= req.body
const updates = req.body
const group = await Group.findById(groupId)
if(!group){
    return res.status(404).json({
        error:"group not found"
    })
}

if(req.files){
    console.log("image updated")
    const image = req.files.groupImage
    const groupImage = await uploadImageToCloudinary(
        image ,
        process.env.FOLDER_NAME    
    )
    groupImage.image =groupImage.secure_url
}

for(const key in updates){
    if(updates.hasOwnProperty(key)){
        group[key]=updates[key]
    }
}
await group.save()

const updatedGroup = await Group.findOne({ _id: groupId })
.populate({
  path: "users",
  populate: {
    path: "additionalDetails", 
  },
}).exec()

res.json({
    success: true,
    message: "groupUpdated updated successfully",
    data : updatedGroup

  })

    }catch(error){
        console.error(error)
        res.status(500).json({
          success: false,
          message: "Internal server error",
          error: error.message,
        })
    }
}

exports.deleteGroup = async(req,res)=>{
try{
    const {groupId}= req.body
    const group =await Group.findById(groupId)
    if(!group){
        return res.status(404).json({
            message :"Group not found"
        })
    }
     
    const userPresent = Group.users
    for(const userId of userPresent){
        await User.findByIdAndUpdate({userId},{
            $pull :{groups :groupId}
        })
    }
    await Group.findOneAndDelete(groupId)
    return res.status(200).json({
        success: true,
        message: "Group deleted successfully",
      })
}catch(error){
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
}
}