import React from "react";
import { P } from "react-html5video/dist";
import { FaSearch } from "react-icons/fa";

function SearchInput({value = '', onChange = ()=> {}}) {
  return (
    <div className="w-[100%] max-w-3xl items-center border-[#E93C24] border-[1px] rounded-[15px] h-[40px] bg-[#000] relative flex">
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Search by name or keyword"
        className="w-[100%] h-[100%] bg-transparent text-[14px] text-[#fff] px-10 focus:outline-none"
      />
      <FaSearch color="#E93C24" className="absolute right-8" size={20} />
    </div>
  );
}

export default SearchInput;
