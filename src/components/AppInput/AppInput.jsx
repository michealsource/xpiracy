import React from "react";

function AppInput({
  placeholder,
  type = "text",
  value = "",
  onChange,
  bg = "#000",
}) {
  return (
    <div
      className={`w-full max-w-3xl mb-8 items-center border-[#E93C24] border-[1px] rounded-[12px] h-[40px] bg-[${bg}] relative flex`}
    >
      <input
        autoComplete="off"
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-[100%] h-[100%] bg-transparent rounded-[12px] text-[12px] text-[${
          bg == "#fff" ? "#000" : "#fff"
        }] px-10 focus:outline-none`}
      />
    </div>
  );
}

export default AppInput;
