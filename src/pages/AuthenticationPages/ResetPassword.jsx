import React, { useEffect, useState } from "react";
import User_fill from "../../assets/images/User_fill.png";
import AppInput from "../../components/AppInput/AppInput";
import AppBtn from "../../components/AppBtn/AppBtn";
import loginBg from "../../assets/images/loginBgImage.png";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../api/axios";
import Loader from "../../components/Loader/Loader";
import Swal from "sweetalert2";
import jwt_decode from "jwt-decode";

function ResetPassword() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRe, setPasswordRe] = useState("");
  const [payload, setPayload] = useState({});
  const [input, setInput] = useState({
    code: "",
    newPassword: "",
    confirmPassword: "",
  });
  const { token: _token } = useParams();

  useEffect(()=>{
      
      try{
        const token = atob(_token);
    
        var decoded = jwt_decode(token);
        console.log(decoded);
        setToken(token);

        const now = (new Date()).getTime();
        const dateCreated = (new Date(decoded.time)).getTime();

        console.log(now > dateCreated, (new Date()).toISOString(), (new Date(decoded.time)).toISOString());

        if(now > dateCreated){
            // expired
            (new Swal('Oops...', "Token already existed", 'error'));
            navigate('/');
            return ;
        }

        setEmail(decoded.email)

    }catch(e){
        console.log(e)
        window.location.href = '';
    }
  }, []);

  const changePasswordNow = async ()=>{
    try{
        // check if password matches re-password
        if(password.length < 4){
            (new Swal('Oops...', "Password too short", 'error'));
            return ;
        }

        if(password != passwordRe){
            (new Swal('Oops...', "Password doesn't match", 'error'));
            return ;
        }

        setLoading(true)
        // const { data } = await axiosClient().post("otp/email", {email});
        // setPayload(data.payload)
        const { data } = await axiosClient().post("change-password", {
          email,
          password,
          resetPasswordToken: token
        });
  
        // setPage(2)
        (new Swal('Success', "Password Updated", 'success'));
        navigate('/');
      }catch(e){
        (new Swal('Oops...', "Account not found", 'error'));
      }
  
      setLoading(false)
  }

  const validateForOtp = async()=>{
    try{
      setLoading(true)
      // const { data } = await axiosClient().post("otp/email", {email});
      // setPayload(data.payload)
      const { data } = await axiosClient().post("forgot-password/link", {
        email,
        websiteUrl: `${window.location.protocol}//${window.location.host}/`
      });

      // setPage(2)
      (new Swal('Success', "Reset Link has been to your mail", 'success'));
    }catch(e){
      (new Swal('Oops...', "Account not found", 'error'));
    }

    setLoading(false)
  }

  const changePassword = async()=>{
    try{
      if(input.code != payload.otp){
        (new Swal('Oops...', "OTP INVALID", 'error'));
        return ;
      }
      
      if(input.newPassword != input.confirmPassword){
        (new Swal('Oops...', "Password doesn't match", 'error'));
        return ;
      }
      setLoading(true)
      const { data } = await axiosClient().post("change-password", {
        "email": email,
        "password": input.newPassword,
        "resetPasswordToken": payload.resetPasswordToken
      });

      (new Swal('Changed Successfully', "", 'success'));
    }catch(e){
      (new Swal('Oops...', "Error", 'error'));
    }

    setLoading(false)
  }

  return (
    <>
      {loading && <Loader />}
      <div className=" flex justify-between relative container px-40 ">
        <div className="flex  w-full flex-col items-center  max-w-md">
          <h5 className="text-[#fff] text-[26px] font-bold">CREATE NEW PASSWORD</h5>

          <div>
            <img
              src={User_fill}
              alt=""
              className="w-[100px] h-[100px] inline-block mb-5"
            />
          </div>

          {
            (page == 1) && 
            (
              <>
              <AppInput value={password} type="password" placeholder="Enter Password" onChange={val => setPassword(val)} />
              <AppInput value={passwordRe} type="password" placeholder="Re-Enter Password" onChange={val => setPasswordRe(val)} />
              
              <AppBtn
                title="UPDATE"
                onClick={()=> changePasswordNow()}
                className="bg-[#EB440F] mt-5 text-[16px]  w-full  text-[#fff] font-medium py-5 p-3 px-5 rounded-[20px] "
              />
              </>
            )
          }
          
          {
            (page == 2) && 
            (
              <>
              <AppInput value={input.code} onChange={val => setInput({...input, code: val})} placeholder="Code sent to email" />
              <AppInput type="password" value={input.newPassword} onChange={val => setInput({...input, newPassword: val})} placeholder="New Password" />

              <AppInput type="password" value={input.confirmPassword} onChange={val => setInput({...input, confirmPassword: val})} placeholder="Confirm New Password" />

              <AppBtn
                title="SUBMIT"
                onClick={()=> changePassword()}
                className="bg-[#EB440F] mt-5 text-[16px]  w-full  text-[#fff] font-medium py-5 p-3 px-5 rounded-[20px] "
              />
              </>
            )
          }

          
        </div>
        <div className=" flex-1 max-w-4xl absolute -top-24 right-40 bottom-0 -z-10">
          <img src={loginBg} alt="" className=" h-[820px] " />
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
