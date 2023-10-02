import React, { ChangeEventHandler, FunctionComponent } from "react";

import { Units } from "pages/Weather/types";

interface SelectFieldProps {
  onChange: ChangeEventHandler<HTMLSelectElement>;
  value: string | number;
  options: { value: Units; title: string }[];
}

export const SelectField: FunctionComponent<SelectFieldProps> = ({ onChange, value, options }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      data-test="select"
      className="shadow-md rounded-md p-2 w-full border-none outline-none"
    >
      {options.map((option, index) => (
        <option key={`${index}-${option.title}`} value={option.value}>
          {option.title}
        </option>
      ))}
    </select>
  );
};
