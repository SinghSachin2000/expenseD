const mongoose = require("mongoose");
const Card = require("../models/Card");
const Group = require("../models/Group");

exports.createsCard = async (req, res) => {
  try {
    const { groupId } = req.params;

    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Group not found!!",
      });
    }

    const cards = [];
    for (const userId of group.users) {
      const card = await Card.create({
        user: userId,
        // Add other card fields here if needed
      });
      cards.push(card);
      group.cards.push(card._id); // Add the card ID to the group's cards array
    }

    await group.save(); // Save the group document with the updated cards array

    return res.status(200).json({
      success: true,
      message: "Cards created successfully",
      cards, // Include the created cards in the response
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create the cards",
      error: error.message,
    });
  }
};

exports.deleteCard = async (req,res)=>{
 try{
    const {cardId} = req.params
    const userId = await Card.findById({cardId}).populate("user");
    console.log(cardId,userId);

    if(!cardId || !userId){
        return res.status(401).json({
            success:false,
            message:"card And user not found "
        })
    }
    
   await Card.findByIdAndUpdate({cardId},{
    $pull:{user:userId}
   },{new:true})

    const updatedGroup =await Group.findByIdAndDelete({cardId},{
        $pull:{ user:userId,cards:cardId}
    },{new:true})
   return res.status(200).json({
    success:true,
    message:"card delted successfully",
    updatedGroup
   })

}catch(error){
return res.status(404).json({
    success:false,
    message:"failed to delete the card"
})
} 
}