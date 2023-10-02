import React, { FunctionComponent, MouseEventHandler } from "react";

interface ButtonProps {
  text: string;
  onClick: MouseEventHandler;
  icon?: string;
  disabled?: boolean;
}

export const Button: FunctionComponent<ButtonProps> = ({ text, onClick, icon, disabled }) => {
  return (
    <button
      onClick={onClick}
      data-test="button"
      className="bg-[#3461eb] text-white w-full p-2 rounded-md shadow-md duration-200"
      disabled={disabled}
    >
      <div className="flex items-center justify-center text-center">
        {icon && <img src={icon} className="w-6" />}
        {text}
      </div>
    </button>
  );
};
