import { Link } from "react-router-dom"
import signupimg from "../assets/signup2.png"
import SignupForm from "../components/core/Auth/SignupForm"



export default function Signup(){
    return (
        <div className="bg-[#303841] lg:h-[100vh] w-full flex m-0 lg:flex-row flex-col">
         <div className="lg:w-[50%] w-[100%] bg-[#3b444b]  items-center">
            <Link to="/">
              <div className="text-2xl drop-shadow-lg font-bold m-2 text-[#ef6407]">SLICE<span className="text-[#F5E8E4]">MATE</span></div>
            </Link>
            <div className="flex items-center justify-center">
            <img src={signupimg} className="drop-shadow-custom-black lg:h-[400px] h-[400px]"/>
            </div>
           </div>
           <div className="lg:w-[50%] w-[100%] flex items-center justify-center ">
            <div className="p-4">
              <div className="text-orange-500 font-bold text-3xl p-4 ">Sign Up <span className="text-red-100">Now...</span></div>  
             <SignupForm/>
            </div>
           </div>
        </div>
    )
}