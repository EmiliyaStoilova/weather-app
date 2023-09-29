import React, { FunctionComponent, MouseEventHandler } from "react";

interface ButtonProps {
  text: string;
  onClick: MouseEventHandler;
  testId: string;
  icon?: string;
  disabled?: boolean;
}

export const Button: FunctionComponent<ButtonProps> = ({ text, onClick, testId, icon, disabled }) => {
  return (
    <button
      onClick={onClick}
      data-test={testId}
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
