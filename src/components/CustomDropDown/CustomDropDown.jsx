import React from "react";
import Select from "react-select";
import { customStyles } from "../../constants/dropDownStyle";

const CustomDropDown = ({
  options,
  name,
  value,
  onChange,
  onBlur,
  title,
  required,
  placeholder,
  disabled,
}) => {
  return (
    <div>
      <div className="flex items-center">
        <span className="inline-block mb-1 text-[#fff] text-lg font-montserrat font-medium">
          {title}
        </span>
      </div>
      <Select
        styles={customStyles}
        id={name}
        name={name}
        options={options}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        isDisabled={disabled}
      />
    </div>
  );
};

export default CustomDropDown;
