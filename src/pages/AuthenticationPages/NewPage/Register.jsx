import React, { useEffect, useState } from "react";
import "./styles.css";
import AppInput from "../../../components/AppInput/AppInput";
import AppBtn from "../../../components/AppBtn/AppBtn";
import Google from "../../../assets/resource/Google.png";
import Facebook from "../../../assets/resource/Facebook.png";
import Apple from "../../../assets/resource/Apple.png";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearLoginStatus,
  clearSignUpStatus,
  setUserData,
} from "../../../redux/reducers/authentication";
import Swal from "sweetalert2";
import * as yup from "yup";
import {
  signInAction,
  signUpAction,
} from "../../../redux/actions/authenticationAction";
import Loader from "../../../components/Loader/Loader";
import { FiX } from "react-icons/fi";
import axiosClient from "../../../api/axios";
import { setToken } from "../../../redux/storage";
import axios from "axios";

export default function NewRegister() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authenticationSlice = useSelector((_) => _.authenticationSlice);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const register = async () => {
    try {
      // validate request
      const validationSchema = yup.object({
        email: yup.string().email().trim().required("email is required"),
        password: yup.string().trim().required("password is required"),
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

  const socialGoogleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      setLoading(true);
      const result = tokenResponse.access_token;
      // const result = tokenResponse.code;

      // console.log(tokenResponse)

      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${result}`
        )
        .then(async (response) => {
          const {
            data: { payload },
          } = await axiosClient().post("social", {
            email: response.data.email,
            first_name: response.data.family_name,
            last_name: response.data.given_name,
          });
          // console.log(payload, "pppppppp");
          dispatch(setUserData(payload));
          setToken(payload.token);
          setTimeout(() => {
            window.location.replace("/");
          }, 1200);
        })
        .catch((e) => {
          console.log(e);
          setLoading(false);
        });
    },
    // flow: 'auth-code',
  });

  return (
    <div className="auth-modal-cover">
      {loading && <Loader />}
      <div className="auth-modal-container relative">
        <div className="auth-modal-title">XPIRACY</div>
        <div className="auth-modal-subtitle">Create Account</div>
        <FiX
          className="absolute right-10 top-5 cursor-pointer"
          size={25}
          onClick={() => navigate(-1)}
        />
        <div>
          <AppInput
            value={input.email}
            onChange={(val) => setInput({ ...input, email: val })}
            type="email"
            placeholder="EMAIL"
            bg={"#fff"}
          />
          <AppInput
            value={input.password}
            onChange={(val) => setInput({ ...input, password: val })}
            type="password"
            placeholder="PASSWORD"
            bg={"#fff"}
          />

          <AppBtn
            title="CONTINUE"
            onClick={() => register()}
            className="bg-[#EB440F] mt-2 text-[16px] hover:bg-[#D14223] justify-center  w-full  text-[#fff] font-medium py-3 p-3 px-5 rounded-[12px] "
          />

          <div style={{ paddingTop: 8, textAlign: "center" }}>
            Already have an account?{" "}
            <span
              onClick={() => navigate("/authenticate")}
              style={{ cursor: "pointer", color: "#E93C24" }}
            >
              Sign In
            </span>
          </div>

          <div className="mt-10">
            <AppBtn
              title={
                <div className="flex">
                  <div className="w-[25px">
                    <img src={Google} className="social-img" />
                  </div>

                  <span className="text-xl ml-5">Continue with Google</span>
                </div>
              }
              onClick={() => {
                socialGoogleLogin();
              }}
              className="border-[#EB440F] hover:bg-[#EBEBEB] mt-2 text-[12px]  w-full  text-[#black] py-3 p-3 px-5 rounded-[12px] "
            />

            <AppBtn
              title={
                <div
                  className="flex"
                  // style={{
                  //   display: "flex",
                  //   alignItems: "center",
                  //   paddingLeft: "18%",
                  // }}
                >
                  <div className="w-[25px">
                    <img src={Facebook} className="social-img" />
                  </div>

                  <span className=" text-xl ml-5">Continue with Facebook</span>
                </div>
              }
              onClick={() => {}}
              className="border-[#EB440F] hover:bg-[#EBEBEB]  mt-2 text-[12px]   w-full  text-[#black] py-3 p-3 px-5 rounded-[12px] "
            />

            <AppBtn
              title={
                <div className="flex">
                  <div className="w-[25px]">
                    <img src={Apple} className="social-img" />
                  </div>

                  <span className="text-xl ml-5"> Continue with Apple</span>
                </div>
              }
              onClick={() => {}}
              className="border-[#EB440F] mt-2 text-[12px] hover:bg-[#EBEBEB]   w-full  text-[#black] py-3 p-3 px-5 rounded-[12px] "
            />
          </div>
        </div>
      </div>
    </div>
  );
}
