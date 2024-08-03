const User = require("../models/User")
const OTP = require("../models/OTP")
const bcrypt = require("bcrypt")
const Profile = require("../models/Profile")
const jwt = require("jsonwebtoken")
const otpGenerator = require("otp-generator")
require("dotenv").config()
//signup
exports.signup=async(req,res)=>{
    try{
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            otp,
          } = req.body

          if(!firstName || !lastName || !email || !password || !confirmPassword||!otp){
            return res.status(403).Send({
              success:false,
              message:"All Fields are required"
            })
          }

          if(password!=confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password and Confirm Password do not match. Please try again.",
            })
          }
          const existingUser =await User.findOne({email})
          if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User already exists. Please sign in to continue."
            })
          }

          const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
          if (response.length === 0 || otp !== response[0].otp) {
            return res.status(400).json({
              success: false,
              message: "The OTP is not valid",
            });
          }
           
         const hashedPassword = await bcrypt.hash(password,10)
         const profileDetails =await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null,
         })
         const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            additionalDetails: profileDetails._id,
            image: "",
         })
         return res.status(200).json({
            success: true,
            user,
            message: "User registered successfully",
          })
    }catch(error){
          console.error(error)
           return res.status(500).json({
          success: false,
          message: "User cannot be registered. Please try again.",
        })
    }
}
//sendotp
exports.sendotp = async(req,res)=>{
    try{
    const {email} =req.body

    const checkUserPresent = await User.findOne({email})
    if(checkUserPresent){
        return res.status(401).json({
            success:false,
            message:"user is already registered",
        })
    }

    var otp =otpGenerator.generate(6,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false,
    })
    const result = await OTP.findOne({otp:otp})
    while(result){
        otp =otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        })
    }
     
    const otpPayload = {email,otp}
    const otpBody = await OTP.create(otpPayload)
    res.status(200).json({
        success :true,
        message:"otp sent successfully"
    })
    }
    catch(error){
        console.log(error.message)
    return res.status(500).json({ success: false, error: error.message })
    }
}
//login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please Fill up All the Required Fields"
            });
        }

        const user = await User.findOne({ email }).populate("additionalDetails");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User is not registered with us. Please signup to continue"
            });
        }

        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(
                {
                    email: user.email,
                    id: user._id
                },
                process.env.JWT_SECRET,
                { expiresIn: "24h" }
            );

            user.token = token;
            user.password = undefined;

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };

            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "User login success"
            });
        } else {
            return res.status(401).json({
                success: false,
                message: "Password is incorrect"
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Login failure. Please try again"
        });
    }
};

