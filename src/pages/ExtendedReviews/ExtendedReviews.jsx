import React from "react";
import extended1 from "../../assets/images/extended1.png";
import extended2 from "../../assets/images/extended2.png";
import extended3 from "../../assets/images/extended3.png";
import extended4 from "../../assets/images/extended4.png";
import extended5 from "../../assets/images/extended5.png";
import SearchInput from "../../components/SearchInput/SearchInput";

function ExtendedReviews() {
  return (
    <div className="container px-40  pt-[40px]">
      <h2 className="text-[#fff] text-[30px] mb-5">EXTENDED INTERVIEWS</h2>

      <SearchInput />

      <div className=" container">
        {" "}
        <img src={extended1} alt="" className="w-full object-cover" />
      </div>
      <div>
        {" "}
        <img src={extended2} alt="" />
      </div>
      <div>
        {" "}
        <img src={extended3} alt="" />
      </div>
      <div>
        {" "}
        <img src={extended4} alt="" />
      </div>
      <div>
        {" "}
        <img src={extended5} alt="" />
      </div>
    </div>
  );
}

export default ExtendedReviews;
