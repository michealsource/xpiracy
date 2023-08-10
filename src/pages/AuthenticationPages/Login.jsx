import React, { useEffect, useState } from "react";
import User_fill from "../../assets/images/User_fill.png";
import AppInput from "../../components/AppInput/AppInput";
import AppBtn from "../../components/AppBtn/AppBtn";
import loginBg from "../../assets/images/loginBgImage.png";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import "./Auth.css";
import { signInAction } from "../../redux/actions/authenticationAction";
import { clearLoginStatus } from "../../redux/reducers/authentication";
import Loader from "../../components/Loader/Loader";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authenticationSlice = useSelector((_) => _.authenticationSlice);

  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const login = async () => {
    try {
      // validate request
      const validationSchema = yup.object({
        email: yup.string().email().trim().required("email is required"),
        password: yup.string().trim().required("password is required"),
      });
      await validationSchema.validate(input);

      dispatch(signInAction(input));
    } catch (error) {
      new Swal("Oops...", error.message, "error");
    }
  };

  useEffect(() => {
    if (authenticationSlice.signingInStatus == "loading") {
      setLoading(true);
    } else if (authenticationSlice.signingInStatus == "completed") {
      dispatch(clearLoginStatus());
      window.location.replace("/");
      setLoading(false);
    } else if (authenticationSlice.signingInStatus == "failed") {
      setLoading(false);
      new Swal("Oops...", authenticationSlice.signingInError, "error");
      dispatch(clearLoginStatus());
    }
  }, [authenticationSlice]);

  return (
    <>
      {loading && <Loader />}
      <div
        id="auth-container"
        className=" flex justify-between relative container px-40 "
      >
        <div className="flex  w-full flex-col items-center  max-w-md">
          <h5 className="text-[#fff] text-[26px] font-bold">LOG IN</h5>
          <div>
            <img
              src={User_fill}
              alt=""
              className="w-[100px] h-[100px] inline-block mb-5"
            />
          </div>

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

          <div className="w-full flex items-end justify-end relative -mt-6">
            <span
              className="text-[#fff] inline-block text-[14px] cursor-pointer "
              onClick={() => navigate("/forgot-password")}
            >
              Forgot password
            </span>
          </div>

          <AppBtn
            title="LOG IN"
            onClick={() => login()}
            className="bg-[#EB440F] mt-10 text-[16px]  w-full  text-[#fff] font-medium py-5 p-3 px-5 rounded-[20px] "
          />
          <div className="flex flex-col justify-center items-center mt-10 ">
            <span className="text-[16px] text-[#fff] inline-block mb-5">
              Or
            </span>
            <span className="text-[16px] text-[#fff] cursor-pointer mb-2">
              {" "}
              Log in with Google
            </span>
            <span className="text-[16px] text-[#fff] cursor-pointer mb-2">
              {" "}
              Log in with FaceBook
            </span>
            <span className="text-[16px] text-[#fff] cursor-pointer mb-2">
              Log in with Apple
            </span>
            <span className="text-[16px] text-[#fff] cursor-pointer mb-2">
              Log in with Crypto Wallet
            </span>
            <div className="text-[16px] text-[#fff] flex items-center mb-2">
              <span> Don't have an account</span>
              <span
                className="text-[#EB440F] inline-block ml-4 cursor-pointer"
                onClick={() => navigate("/registration")}
              >
                SignUp
              </span>
            </div>
          </div>
        </div>
        <div
          id="jes-icon"
          className=" flex-1  absolute -top-24 right-40 bottom-0 max-w-4xl -z-10"
        >
          <img src={loginBg} alt="" className=" h-[800px] " />
        </div>
      </div>
    </>
  );
}

export default Login;
