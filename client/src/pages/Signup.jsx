import { Link } from "react-router-dom"
import signupimg from "../assets/signup2.png"
import SignupForm from "../components/core/Auth/SignupForm"



export default function Signup(){
    return (
        <div className="bg-[#303841] h-[100vh] w-full flex m-0 lg:flex-row flex-col">
         <div className="w-[50%] bg-[#3b444b]  items-center">
            <Link to="/">
              <div className="text-2xl drop-shadow-lg font-bold m-2 text-[#ef6407]">SLICE<span className="text-[#F5E8E4]">MATE</span></div>
            </Link>
            <img src={signupimg} className="drop-shadow-custom-black lg:h-[400px] h-[400px] lg:ml-28"/>
           </div>
           <div className="w-[50%] flex items-center justify-center ">
             <SignupForm/>
           </div>
        </div>
    )
}