import React from "react";
import send from "../../assets/images/send.png";

function Help() {
  return (
    <div className=" container px-40  pt-[40px]">
      <h2 className="text-[#fff] text-[30px] mb-5">HELP</h2>
      <h5 className="text-[#fff] mt-5 mb-5 text-[20px]">FAQs</h5>
      <p className="text-[#fff]">
        Q: What are Christian movies? A: Christian movies are films that explore
        themes of faith, spirituality, and Christian values. They often revolve
        around biblical stories, religious figures, or contemporary stories with
        a strong Christian message. These movies aim to entertain and inspire
        audiences while promoting Christian beliefs and values.
      </p>

      <p className="text-[#fff] mt-10">
        Q: Are Christian movies only for Christian audiences? A: While Christian
        movies are primarily targeted at Christian audiences, they can be
        enjoyed by people of various faith backgrounds or even those with no
        specific religious affiliation. Some films have achieved mainstream
        success due to their universal themes, emotional storytelling, and
        strong performances. However, it's important to note that Christian
        movies often contain overt Christian messaging, so viewers should be
        aware of this aspect.
      </p>

      <h5 className="text-[#fff] text-[16px] mt-10 mb-5">Send a message</h5>
      <div className="w-[100%] max-w-3xl items-center border-[#fff] border-[1px] rounded-[15px] h-[40px] bg-[#000] relative flex">
        <input
          type="text"
          placeholder="search"
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

export default Help;
