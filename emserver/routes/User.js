const express = require("express")
const router =express.Router()

const {signup,sendotp,login }= require("../controllers/Auth")
const {changePassword,resetPasswordToken,resetPassword} =require("../controllers/ResetPassword");
const {authenticateToken}=require("../middlewares/auth")

router.post("/signup",signup)
router.post("/login",login)
router.post("/sendotp",sendotp)

router.post("/changepassword",authenticateToken,changePassword);
router.post("/reset-password-token",resetPasswordToken);
router.post("/reset-password",resetPassword)

module.exports = router
