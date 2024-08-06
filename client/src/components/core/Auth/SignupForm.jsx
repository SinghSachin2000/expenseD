import {Input,Button} from "@nextui-org/react";
import EyeFilledIcon from "../../../assets/openeye.png";
import EyeSlashFilledIcon from "../../../assets/closeeye.svg";
import { useState } from "react";

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
        </div>
    )
}
export default SignupForm