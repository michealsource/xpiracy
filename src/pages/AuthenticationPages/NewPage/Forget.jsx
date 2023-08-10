import React, { useEffect, useState } from "react";
import "./styles.css";
import AppInput from "../../../components/AppInput/AppInput";
import AppBtn from "../../../components/AppBtn/AppBtn";
import Google from "../../../assets/resource/Google.png";
import Facebook from "../../../assets/resource/Facebook.png";
import Apple from "../../../assets/resource/Apple.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearLoginStatus } from "../../../redux/reducers/authentication";
import Swal from "sweetalert2";
import * as yup from "yup";
import { signInAction } from "../../../redux/actions/authenticationAction";
import Loader from "../../../components/Loader/Loader";
import axiosClient from "../../../api/axios";
import { FiX } from "react-icons/fi";

export default function NewForget() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authenticationSlice = useSelector((_) => _.authenticationSlice);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const forget = async () => {
    try {
      setLoading(true);
      // validate request
      const validationSchema = yup.object({
        email: yup.string().email().trim().required("email is required"),
      });
      await validationSchema.validate(input);

      await axiosClient().post("forgot-password/link", {
        email: input.email,
        websiteUrl: `${window.location.protocol}//${window.location.host}/`,
      });

      new Swal("Success", "Reset Link has been to your mail", "success");
    } catch (error) {
      //   new Swal("Oops...", error.message, "error");
      new Swal("Oops...", "Account not found", "error");
    }
    setLoading(false);
  };

  return (
    <div className="auth-modal-cover">
      {loading && <Loader />}
      <div className="auth-modal-container relative">
        <div className="auth-modal-title">SPIRACY</div>
        <div className="auth-modal-subtitle">Forget Password</div>

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

          <AppBtn
            title="CONTINUE"
            onClick={() => forget()}
            className="bg-[#EB440F] mt-2 text-[16px] hover:bg-[#D14223] justify-center  w-full  text-[#fff] font-medium py-3 p-3 px-5 rounded-[12px]"
          />

          <div style={{ paddingTop: 8, textAlign: "center" }}>
            Have an account?{" "}
            <span
              onClick={() => navigate("/authenticate")}
              style={{ cursor: "pointer", color: "#E93C24" }}
            >
              Sign In
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
