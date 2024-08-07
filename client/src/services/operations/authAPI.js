import toast from "react-hot-toast";
import { endpoints } from "../apis";
import { apiConnector } from "../apiconnector";
import { setLoading,setToken } from "../../slices/authSlice";

const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
} = endpoints

export function sendOtp(email,navigate){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try{
         const response = await apiConnector("POST",SENDOTP_API,{
            email,
            checkUserPresent:true,
         })
         console.log("SENDOTP API RESPONSE....",response);
         console.log(response.data.success)

         if(!response.data.success){
            throw new Error(response.data.message)
         }
         toast.success("OTP Sent Successfully");
         navigate("/verify-email")
        }catch(error){
         console.log("SENDOTP API ERROR....",error);
         toast.error("Could not send otp")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function signUp( firstName,lastName,email, password, confirmPassword,  otp, navigate){
    return async (dispatch)=>{
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try{
            const response = await apiConnector("POST",SIGNUP_API,{
                firstName,lastName,email, password, confirmPassword,  otp, 
            })

            console.log("Signup Api response", response);

            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Signup successfull")
            navigate("/login")
        }catch(error){
         console.log("Signup api error....");
         toast.error("signup failed")
         navigate("/signup")

        }
        dispatch(setLoading(false)),
        toast.dismiss(toastId)
    }
}

export function login(email, password,navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST", LOGIN_API, {
                email,
                password
            }, {
                withCredentials: true
            })
            console.log("LOGIN API RESPONSE .....", response);

            if (!response.data.success) {
                throw new error(response.data.message);
            }
            toast.success("Login Successful")
            dispatch(setToken(response.data.token))

            console.log("Navigating to dashboard...");
            navigate("/about")
        } catch (error) {
            console.log("LOGIN API ERROR............", error)
            toast.error("Login Failed")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}