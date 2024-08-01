const express = require("express")
const router =express.Router()

const {createGroup,editGroup,deleteGroup }= require("../controllers/Group")
const {addingMemberToGroup,sendInvitation,removeMember}= require("../controllers/GroupMembers")
const {authenticateToken}= require("../middlewares/auth")
router.post("/createGroup",authenticateToken,createGroup)
router.put("/editGroup/:groupId",authenticateToken,editGroup)
router.delete("/deleteGroup/:groupId",authenticateToken,deleteGroup)


router.post("/adding-member",authenticateToken,addingMemberToGroup)
router.post("/sendInvitation",authenticateToken,sendInvitation)
router.delete("/removeMember",authenticateToken,removeMember)



module.exports = router
