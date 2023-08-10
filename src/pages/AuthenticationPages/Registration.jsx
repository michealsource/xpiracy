import React, { useEffect, useState } from "react";
import User_fill from "../../assets/images/User_fill.png";
import AppInput from "../../components/AppInput/AppInput";
import AppBtn from "../../components/AppBtn/AppBtn";
import loginBg from "../../assets/images/loginBgImage.png";
import { useNavigate } from "react-router-dom";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";
import Loader from "../../components/Loader/Loader";
import Swal from "sweetalert2";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { signUpAction } from "../../redux/actions/authenticationAction";
import { clearSignUpStatus } from "../../redux/reducers/authentication";

function Registration() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authenticationSlice = useSelector((_) => _.authenticationSlice);

  const [input, setInput] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    country: "",
  });
  const [loading, setLoading] = useState(false);

  const register = async () => {
    try {
      // validate request
      const validationSchema = yup.object({
        email: yup.string().email().trim().required("email is required"),
        first_name: yup.string().trim().required("first name is required"),
        last_name: yup.string().trim().required("last name is required"),
        password: yup.string().trim().required("password is required"),
        country: yup.string().trim().required("country is required"),
      });
      await validationSchema.validate(input);

      dispatch(signUpAction(input));
    } catch (error) {
      new Swal("Oops...", error.message, "error");
    }
  };

  useEffect(() => {
    if (authenticationSlice.signingUpStatus == "loading") {
      setLoading(true);
    } else if (authenticationSlice.signingUpStatus == "completed") {
      dispatch(clearSignUpStatus());
      window.location.replace("/");
      try {
        setLoading(false);
      } catch (e) {}
    } else if (authenticationSlice.signingUpStatus == "failed") {
      new Swal("Oops...", authenticationSlice.signingUpError, "error");
      dispatch(clearSignUpStatus());

      try {
        setLoading(false);
      } catch (e) {}
    }
  }, [authenticationSlice]);

  return (
    <>
      {loading && <Loader />}
      <div id="auth-container" className=" flex justify-between relative container px-40 ">
        <div className="flex  w-full flex-col items-center  max-w-md">
          <h5 className="text-[#fff] text-[26px] font-bold">SIGN UP</h5>
          <div>
            <img
              src={User_fill}
              alt=""
              className="w-[100px] h-[100px] inline-block mb-5"
            />
          </div>

          <AppInput
            value={input.first_name}
            onChange={(val) => setInput({ ...input, first_name: val })}
            type="text"
            placeholder="First Name"
          />
          <AppInput
            value={input.last_name}
            onChange={(val) => setInput({ ...input, last_name: val })}
            type="text"
            placeholder="Last Name"
          />
          <AppInput
            value={input.email}
            onChange={(val) => setInput({ ...input, email: val })}
            type="email"
            placeholder="EMAIL"
          />
          <AppInput
            value={input.password}
            onChange={(val) => setInput({ ...input, password: val })}
            type="password"
            placeholder="PASSWORD"
          />

          {/* <AppInput value={input.country} onChange={(val) => setInput({...input, country: val})} type="email" placeholder="COUNTRY" /> */}
          <div style={{ position: "relative" }}>
            <CountryDropdown
              value={input.country}
              // defaultOptionLabel="Select Your Country"
              classes="custom-country bg-transparent text-[14px] text-[#fff] px-28 py-16 focus:outline-none"
              onChange={(val) => setInput({ ...input, country: val })}
            />

            <div
              style={{
                position: "absolute",
                top: "20%",
                left: 20,
                zIndex: 99,
                color: "rgba(255, 255, 255, 0.78)",
                fontSize: 14,
              }}
            >
              {input?.country || "Please Select Country"}
            </div>
          </div>

          <span className="inline-block text-[#fff] text-[8px]">
            By using this app you agree to thr terms of use and privacy policy
          </span>
          {/* <div className="w-full flex items-end justify-end relative -mt-6">
            <span className="text-[#fff] inline-block text-[14px] cursor-pointer ">
              Forgot password
            </span>
          </div> */}

          <AppBtn
            title="SIGN UP"
            onClick={() => register()}
            className="bg-[#EB440F] mt-5 text-[16px]  w-full  text-[#fff] font-medium py-5 p-3 px-5 rounded-[20px] "
          />
          <div className="flex flex-col justify-center items-center mt-10 ">
            <div className="text-[16px] text-[#fff] flex items-center mb-2">
              <span>Already a member </span>
              <span
                className="text-[#EB440F] inline-block ml-4 cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Log in
              </span>
            </div>
          </div>
        </div>
        <div id="jes-icon" className=" flex-1  absolute -top-24 right-40 bottom-0 max-w-4xl -z-10">
          <img src={loginBg} alt="" className=" h-[750px] " />
        </div>
      </div>
    </>
  );
}

export default Registration;
