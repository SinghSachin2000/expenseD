import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import EyeFilledIcon from "../../../assets/openeye.png";
import EyeSlashFilledIcon from "../../../assets/closeeye.svg";
import { Link as RouterLink } from "react-router-dom";

export const LoginForm = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-white  drop-shadow-2xl shadow-2xl rounded-lg flex flex-col items-center justify-center text-white space-y-4 p-4 ">
      <h1 className="text-4xl  font-semibold text-black">Login</h1>
      <Input
        type="email"
        variant="underlined"
        label="Email"
        className="max-w-xs text-white"
      />
      <Input
        label="Password"
        variant="underlined"
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
            aria-label="toggle password visibility"
          >
            {isVisible ? (
              <img
                src={EyeSlashFilledIcon}
                className="h-4 text-default-400 pointer-events-none "
              />
            ) : (
              <img
                src={EyeFilledIcon}
                className="h-4 text-default-400 pointer-events-none"
              />
            )}
          </button>
        }
        type={isVisible ? "text" : "password"}
        className="max-w-xs text-white"
      />
      <Button
        radius="full"
        className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg w-[80%] mt-4"
      >
        Login
      </Button>
      <p className="text-black">
        Don't have an accout?{" "}
        <RouterLink to="/signup" className="text-[#ef6407] font-bold">
          Signup
        </RouterLink>{" "}
      </p>
    </div>
  );
};
