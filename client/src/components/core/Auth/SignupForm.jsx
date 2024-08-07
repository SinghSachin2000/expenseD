import {Input,Button} from "@nextui-org/react";
import EyeFilledIcon from "../../../assets/openeye.png";
import EyeSlashFilledIcon from "../../../assets/closeeye.svg";
import { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";

function SignupForm(){
    const [isVisibleP, setIsVisibleP] = useState(false);
    const [isVisibleC, setIsVisibleC] = useState(false);
    const toggleVisibility = () => setIsVisibleP(!isVisibleP);
    const toggleVisibilityC = () => setIsVisibleC(!isVisibleC);

    return(
        <div className="w-[400px] h-[400px] bg-white drop-shadow-2xl  rounded-lg flex flex-col items-center">
         <Input type="text" variant="underlined" label="First Name" className="max-w-xs"/>
         <Input type="text" variant="underlined" label="Last Name" className="max-w-xs"/>
         <Input type="email" variant="underlined" label="Email" className="max-w-xs"/>
         <Input
            label="Password"
            variant="underlined"
            endContent={
              <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                {isVisibleP ? (
                  <img src={EyeSlashFilledIcon} className="h-4 text-default-400 pointer-events-none " />
                ) : (
                  <img src={EyeFilledIcon} className="h-4 text-default-400 pointer-events-none"  />
                )}
              </button>
            }
            type={isVisibleP ? "text" : "password"}
            className="max-w-xs"
          />

    <Input
     label="Confirm Password"
     variant="underlined"
     endContent={
       <button className="focus:outline-none" type="button" onClick={toggleVisibilityC} aria-label="toggle password visibility">
         {isVisibleC ? (
           <img src={EyeSlashFilledIcon} className="text-2xl text-default-400 pointer-events-none" />
         ) : (
           <img src={EyeFilledIcon} className=" h-4 text-2xl text-default-400 pointer-events-none"  />
         )}
       </button>
        }
     type={isVisibleC ? "text" : "password"}
     className="max-w-xs"
   />

         <Button radius="full" className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg w-[80%] mt-4">
         Sign Up
        </Button>

        <Link to="/">
        <div className="flex justify-center items-center text-blue-500 pt-2 hover:text-cyan-400  ">
        <span className="pr-1">Back</span>
        <span className="mt-1"><FaLongArrowAltRight /></span>
        </div>
        </Link>
        </div>
    )
}
export default SignupForm