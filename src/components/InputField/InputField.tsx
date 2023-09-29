import React, { ChangeEventHandler, FunctionComponent } from "react";

interface InputFieldProps {
  value: number | string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  testId: string;
}

export const InputField: FunctionComponent<InputFieldProps> = ({ value, handleChange, placeholder, testId }) => {
  return (
    <input
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      data-test={testId}
      className="shadow-md rounded-md p-2 w-full border-none outline-none"
    />
  );
};
