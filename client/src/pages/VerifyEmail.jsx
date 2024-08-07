import { useState,useEffect } from "react";
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";
import {BiArrowBack} from "react-icons/bi";
import {RxCountdownTimer} from "react-icons/rx";
import { useDispatch,useSelector } from "react-redux";
import { sendOtp,signUp } from "../services/operations/authAPI";
import { useNavigate } from "react-router-dom";

function VerifyEmail(){
const [otp,setOtp] = useState("");
const {signupData,loading} = useSelector((state)=>state.auth);
const dispatch = useDispatch();
const navigate = useNavigate();

useEffect(()=>{
    if(!signupData){
        navigate("/signup")
    }
},[]);

const handleVerifyAndSignup=(e)=>{
    e.preventDefault();
    const{
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
    }=signupData;

    dispatch(signUp(
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
    ));
};


    return(
   <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center">
    {loading? (
        <div>
            <div className="spinner"></div>
        </div>
    ):(
        <div className="max-w-[500px] p-4 lg:p-8">
            <div className="text-2xl font-bold p-2">Verify Email</div>
            <div>A verification code has been sent to you. Enter the code below</div>
            <form onSubmit={handleVerifyAndSignup}>
             <OtpInput 
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderInput={(props)=>(
                    <input
                    {...props}
                    placeholder="-"
                    style={{
                        boxShadow:"inset 0px -1px 0px rgba(255, 255, 255, 0.18)"
                    }}
                    className="w-[48px] lg:w-[60px] border-0 bg-slate-600 rounded-[0.5rem] text-gray-200 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-orange-600"
                    />
                )}
                containerStyle={{
                    justifyContent:"space-between",
                    gap:"0 6px",
                }}
             /> 
             <button
              type="submit"
              className="w-full bg-orange-600  py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-gray-50"
            >
              Verify Email
            </button>
            </form>
            
        <div>
         <Link to="/signup">
           <p className="text-slate-50 flex items-center gap-x-2">
            <BiArrowBack/>Back To Signup
           </p>
         </Link>
         <button className="flex items-center text-blue-400 gap-x-2" onClick={()=>dispatch(sendOtp(signupData.email))}><RxCountdownTimer/>Resend it</button>     
       </div>   

        </div>
    )}
   </div>
    );
}
export default VerifyEmail;