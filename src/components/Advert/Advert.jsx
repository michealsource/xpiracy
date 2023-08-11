import React from "react";
import advertImg from "../../assets/images/appDisplay.png";
import apple from "../../assets/images/apple.png";
import google from "../../assets/images/google.png";
function Advert() {
  return (
    <div className="md:mx-20 mx-10  mt-10">
      <div className="rounded-xl md:pr-36 pr-0  bg-[#D9D9D9] flex md:flex-row flex-col justify-between items-center">
        <div>
          <img src={advertImg} alt="" className="w-[100%] h-[100%]" />
        </div>
        <div>
          <h4 className="font-bold text-[#000] text-center md:text-left mb-5 text-xl">
            Watch Anytime. Anywhere.
          </h4>
          <p className="md:w-[350px] w-[100%] px-5 text-center md:text-left md:px-0">
            {" "}
            Christspiracy app is the home of record-shattering stories that
            amplify light. In the Christspiracy app users can watch full
            episodes, cast to their television, pay-it-forward to fund future
            seasons of shows they love and buy official merchandise. Download
            the app below for free.
          </p>
          <div className="flex mt-5 px-5 md:px-0">
            <img src={apple} alt="" className="w-[160px] h-[40px]" />
            <img src={google} alt="" className="w-[160px] h-[48px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Advert;
