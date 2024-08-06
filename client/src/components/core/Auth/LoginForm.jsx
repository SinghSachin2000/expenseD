import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import EyeFilledIcon from "../../../assets/openeye.png";
import EyeSlashFilledIcon from "../../../assets/closeeye.svg";

export const LoginForm = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <div className="w-[400px] h-[400px] bg-white bg-opacity-60 drop-shadow-2xl shadow-2xl rounded-lg flex flex-col items-center text-white">
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
    </div>
  );
};
