import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import AppBtn from "../../components/AppBtn/AppBtn";
import { useDispatch, useSelector } from "react-redux";
import { getCommunityAction } from "../../redux/actions/genericAction";
import axiosClient from "../../api/axios";
import { useNavigate } from "react-router-dom";

function ThankYouNote() {
  const [show, setShow] = useState(false);
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {community} = useSelector(state => state.genericSlice)

  useEffect(()=>{
    dispatch(getCommunityAction());
  }, [])

  const sendNote = async()=>{
    try {
      await (axiosClient()).post('community', {
        note: input
      });

      dispatch(getCommunityAction());
    } catch (error) {
      
    } 

    navigate('/viewThankYou');

  }

  return (
    <div className=" container px-40  pt-[40px]">
      <h2 className="text-[#fff] text-[30px] mb-5">SEND A THANK YOU NOTE!</h2>

      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        onChange={(e) => setInput(e.target.value)}
        className="bg-[#B9B19C] h-[272px] w-[600px] p-5 rounded-[25px]"
      >{input}</textarea>

      <div className="flex items-center mt-5">
        <div
          className="w-[33px] cursor-pointer h-[33px] rounded-2xl border-[#E93C24] border-[1px] flex items-center justify-center"
          onClick={() => setShow(!show)}
        >
          {show && <FaCheck color="#fff" size={18} />}
        </div>
        <span className="text-[#fff] inline-block ml-5 text-[16px]">
          I understand my note may appear publicly
        </span>
      </div>
      <AppBtn
        title="SEND THANK YOU NOTE"
        onClick={()=> sendNote()}
        className="bg-[#E93C24] text-[#fff] font-medium p-3 px-10 rounded-[20px] mt-10"
      />
    </div>
  );
}

export default ThankYouNote;
