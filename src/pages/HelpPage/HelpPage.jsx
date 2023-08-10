import React, { useState } from "react";
import send from "../../assets/images/send.png";
import { data } from "../../constants/accodordianData";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

function HelpPage() {
  const [selected, setSelected] = useState(0);

  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
  };
  return (
    <div className="  w-2/3 mx-auto pt-[40px]">
      <h2 className="text-[#fff] text-3xl mb-5">HELP</h2>
      <h5 className="text-[#fff] mt-5 mb-5 text-xl">FAQs</h5>

      <div className="accordian">
        {data.map((item, index) => {
          return (
            <div className="item mt-5 text-[#fff]  p-4 cursor-pointer ">
              <div
                className="flex justify-between mb-3 items-center"
                onClick={() => toggle(index)}
              >
                <div className="flex gap-5">
                  <span className="inline-block text-2xl">{item?.title}</span>
                </div>

                <div className="flex items-center gap-3">
                  {selected === index ? (
                    <BsChevronDown size={20} />
                  ) : (
                    <BsChevronUp size={20} />
                  )}
                </div>
              </div>
              <hr />
              <>
                <div
                  className={
                    selected === index
                      ? "content mt-5 show text-lg"
                      : "content text-lg"
                  }
                >
                  {item.content}
                </div>
              </>
            </div>
          );
        })}
      </div>

      <h5 className="text-[#fff] text-2xl mt-36 mb-5">Send a message</h5>
      <div className="w-[100%] mt-10 mb-36 items-center border-[#fff] border-[1px] rounded-[15px] h-[40px] bg-[#000] relative flex">
        <input
          type="text"
          placeholder="Enter Your Message"
          className="w-[100%] h-[100%] bg-transparent text-[14px] text-[#fff] px-10 focus:outline-none"
        />
        <img
          src={send}
          alt=""
          className="w-[30px] h-[30px] mr-5 cursor-pointer"
        />
      </div>
    </div>
  );
}

export default HelpPage;
