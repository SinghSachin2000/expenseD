const express = require("express")
const router =express.Router()

const {createGroup,editGroup,deleteGroup }= require("../controllers/Group")
const {authenticateToken}= require("../middlewares/auth")
router.post("/createGroup",authenticateToken,createGroup)
router.put("/editGroup",authenticateToken,editGroup)
router.delete("/deleteGroup",authenticateToken,deleteGroup)

module.exports = router
