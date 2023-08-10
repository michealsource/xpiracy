import React, { useEffect, useState } from "react";
import "./styles.css";
import AppInput from "../../../components/AppInput/AppInput";
import AppBtn from "../../../components/AppBtn/AppBtn";
import Google from "../../../assets/resource/Google.png";
import Facebook from "../../../assets/resource/Facebook.png";
import Apple from "../../../assets/resource/Apple.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearLoginStatus,
  setUserData,
} from "../../../redux/reducers/authentication";
import Swal from "sweetalert2";
import * as yup from "yup";
import { signInAction } from "../../../redux/actions/authenticationAction";
import Loader from "../../../components/Loader/Loader";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import axiosClient from "../../../api/axios";
import { setToken } from "../../../redux/storage";
import { FiX } from "react-icons/fi";

export default function NewLogin() {
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
          // dispatch(socialSignUpUpAction(response.data.email));
          // console.log(response);
          // return ;
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
    <div className="auth-modal-cover flex justify-center items-center">
      {loading && <Loader />}
      <div className="auth-modal-container relative ">
        <div className="auth-modal-title">XPIRACY</div>
        <div className="auth-modal-subtitle">Welcome Login Please</div>
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

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              top: -15,
              position: "relative",
            }}
          >
            <span
              onClick={() => navigate("/forget")}
              style={{
                cursor: "pointer",
                color: "#E93C24",
                textAlign: "right",
                width: "100%",
              }}
            >
              Forget Password
            </span>
          </div>

          <AppBtn
            title="CONTINUE"
            onClick={() => login()}
            className="bg-[#EB440F] mt-2 text-[16px] justify-center hover:bg-[#D14223]  items-center text-center w-full  text-[#fff] font-medium py-3 p-3"
          />

          <div style={{ paddingTop: 8, textAlign: "center" }}>
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              style={{ cursor: "pointer", color: "#E93C24" }}
            >
              Sign up
            </span>
            <br />
            <br />
            or
            <br />
          </div>

          <div>
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
