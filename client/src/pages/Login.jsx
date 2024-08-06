import signupimg from "../assets/signup2.png";
import signinimg from "../assets/signin.svg";
import { LoginForm } from "../components/core/Auth/LoginForm";
export default function Login() {
  return (
    <div className=" h-screen">
      <div className="flex flex-col md:flex-row justify-center items-center min-h-screen ">
        <div className="md:w-1/2 flex justify-center ">
          <img
            src={signinimg}
            className="drop-shadow-custom-black h-[400px]  md:h-[400] lg:ml-28"
          />
        </div>
        <div className="md:w-1/2 flex justify-center text-white bg-[#303841]  ">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
