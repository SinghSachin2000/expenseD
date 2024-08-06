import signupimg from "../assets/signup2.png";
import signinimg from "../assets/signin.svg";
import { LoginForm } from "../components/core/Auth/LoginForm";
export default function Login() {
  return (
    <div className="h-screen flex items-center justify-center p-4 bg-[#303841] ">
      <div className="flex flex-col md:flex-row justify-center items-center p-4 space-y-6  ">
        <div className="md:w-1/2 flex justify-center ">
          <img src={signinimg} className="drop-shadow-custom-black" />
        </div>
        <div className="md:w-1/2 flex justify-center text-white bg-[#303841]  ">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
