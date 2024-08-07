import { Link } from "react-router-dom";
import signupimg from "../assets/signup2.png";
import SignupForm from "../components/core/Auth/SignupForm";

export default function Signup() {
  return (
    <div className=" h-[100vh] w-full flex m-0 lg:flex-row flex-col">
      <div className="lg:w-[50vw] w-[100vw] bg-[#3b444b] flex items-center justify-center">
        <img
          src={signupimg}
          className="drop-shadow-custom-black lg:h-[400px] h-[400px] lg:ml-28"
        />
      </div>
      <div className="lg:w-[50vw] w-[100vw] bg-[#303841] p-4 flex flex-col items-center justify-center ">
        <div className="text-2xl p-4 font-bold">Sign Up <span className="text-orange-600">Now...</span></div>
        <SignupForm />
      </div>
    </div>
  );
}
