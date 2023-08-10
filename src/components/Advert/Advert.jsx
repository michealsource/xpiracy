import React from "react";
import advertImg from "../../assets/images/appDisplay.png";
import apple from "../../assets/images/apple.png";
import google from "../../assets/images/google.png";
function Advert() {
  return (
    <div className="mx-20 mt-10">
      <div className="rounded-xl pr-36 bg-[#D9D9D9] flex justify-between items-center">
        <div>
          <img src={advertImg} alt="" className="w-[100%] h-[100%]" />
        </div>
        <div>
          <h4 className="font-bold text-[#000] text-xl">
            Watch Anytime. Anywhere.
          </h4>
          <p className="w-[350px]">
            {" "}
            Christspiracy app is the home of record-shattering stories that
            amplify light. In the Christspiracy app users can watch full
            episodes, cast to their television, pay-it-forward to fund future
            seasons of shows they love and buy official merchandise. Download
            the app below for free.
          </p>
          <div className="flex mt-5">
            <img src={apple} alt="" className="w-[160px] h-[40px]" />
            <img src={google} alt="" className="w-[160px] h-[48px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Advert;
