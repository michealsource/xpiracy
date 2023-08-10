import React, { useState } from "react";
import loginBg from "../../assets/images/loginBgImage.png";
import User_fill from "../../assets/images/User_fill.png";
import AppBtn from "../../components/AppBtn/AppBtn";
import Login from "./Login";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function AuthHome() {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  return (
    <div id="auth-container" className=" flex justify-between container px-40 ">
      <div className="flex flex-col items-center justify-center max-w-md">
        <h5 className="text-[#fff] text-[26px] font-bold">JOIN US</h5>
        <div>
          <img src={User_fill} alt="" />
        </div>

        <p>
          Save your place, track your impact, and connect with others. Create a
          free account now!
        </p>

        <AppBtn
          title="CREATE ACCOUNT"
          onClick={() => navigate("/registration")}
          className="bg-[#EB440F] w-full font-medium text-[#fff] p-3 px-5 rounded-[20px] ml-10"
        />
        <AppBtn
          onClick={() => navigate("/login")}
          title="LOG IN"
          className="border-[#EB440F] mt-5  w-full border-[1px] text-[#fff] font-medium p-3 px-5 rounded-[20px] ml-10"
        />
      </div>

      <div id="jes-icon" className=" flex-1 -mb-80 -mt-40 max-w-5xl -z-10">
        <img src={loginBg} alt="" className=" h-[800px] " />
      </div>

      {/* <div className="-mb-64 -mt-32 max-w-5xl -z-10">
        <img src={loginBg} alt="" className=" h-[660px] " />
      </div> */}
    </div>
  );
}

export default AuthHome;
