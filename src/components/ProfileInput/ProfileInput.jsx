import React from "react";

function ProfileInput({ target, labelText, value = '', onChange = ()=>{} }) {
  return (
    <div className="relative w-full">
      <input
        type="text"
        id={target}
        value={value}
        onChange={onChange}
        className="border-b py-1 w-[100%] text-[#fff] focus:outline-none bg-black focus:border-[#fff] focus:border-b-2 peer"
        autocomplete="off"
      />
      <label
        htmlFor={target}
        className="absolute left-0 text-[#fff] top-1 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all"
      >
        {labelText}
      </label>
    </div>
  );
}

export default ProfileInput;
