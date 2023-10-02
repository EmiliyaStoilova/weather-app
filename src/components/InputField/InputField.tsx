import React, { ChangeEventHandler, FunctionComponent } from "react";

interface InputFieldProps {
  value: number | string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
}

export const InputField: FunctionComponent<InputFieldProps> = ({ value, handleChange, placeholder }) => {
  return (
    <input
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      data-test="input"
      className="shadow-md rounded-md p-2 w-full border-none outline-none"
    />
  );
};
