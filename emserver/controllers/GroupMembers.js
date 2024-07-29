const Group = require("../models/Group")
const User = require("../models/User")

const mailSender = require("../utils/mailSender");
 

exports.sendInvitation = async (req,res)=>{
    try{
      const {groupId,userId} =req.body
      const user  = await User.findById(userId)
      if(!user){
        return res.status(404).json({
            error:"User not found"
        })
      }
      const group =await Group.findById(groupId)
      if(!group){
        return res.status(404).json({
            error:"Group not found"
        })
      }
      console.log("dikha",group,groupId,userId);
      const invitationLink = `http://localhost:4000/api/v1/groups/${groupId}/invite/${userId}`;
      const emailTemplate = `
      <h1>Invitation to join our group</h1>
      <p>You have been invited to join our group. Click <a href="${invitationLink}">here</a> to join.</p>
    `;
      console.log(invitationLink);
    await mailSender(user.email, "Invitation to join our group", emailTemplate);
      res.status(200).json({ message: "Invitation sent successfully!" });

    }catch(error){
        console.error("Error sending invitation:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

exports.addingMemberToGroup =async (req,res)=>{
try{
const {groupId,userId}=req.body
const user = await User.findById(userId)
if(!user){
    return res.status(404).json({
        success:false,
        error:"User not found"
    })
  }
const group = await Group.findById(groupId);
if(!group){
    return res.status(404).json({
      success:false,
       error: "Group not found" });
}

if (group.users.includes(userId)) {
    return res.status(400).json({ error: "User is already a member of the group" });
  }

  const updatedGroup = await Group.findByIdAndUpdate(groupId,{
    $push:{ users:userId}
  },{new:true})

  const updatedUser = await User.findByIdAndUpdate(userId,{
    $push:{  groups:groupId}
  },{new:true})


  res.status(200).json({ message: "Member added successfully!", updatedGroup,updatedUser });
}catch(error){
    console.error("Error adding member to group:", error);
    res.status(500).json({ error: "Internal Server Error" });
}
}

exports.removeMember = async(req,res)=>{
    try{
        const { groupId, userId } = req.body;
        const group = await Group.findById(groupId);
        const user =await User.findById(userId);
        if(!user){
            return res.status(404).json({ error: 'user not found' })
        }
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
          }
          if (!group.users.includes(userId)) {
            return res.status(400).json({ error: 'User is not a member of the group' });
          }


         const updatedGroup = await Group.findByIdAndUpdate(groupId,{
          $pull:{users:userId}
         },{new:true})
           
         const updatedUser = await User.findByIdAndUpdate(userId,{
          $pull:{groups:groupId}
         },{new:true})

          res.status(200).json({ message: 'User removed from group successfully', updatedGroup,updatedUser });
    }catch(error){
        console.error('Error removing user from group:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}