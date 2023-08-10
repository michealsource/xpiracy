import React, { useEffect } from "react";
import map from "../../assets/images/map.png";
import user from "../../assets/images/user.png";
import AppBtn from "../../components/AppBtn/AppBtn";
import { useNavigate } from "react-router-dom";
import "./Community.css";
import { getCommunityAction } from "../../redux/actions/genericAction";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

function Community() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { community } = useSelector((state) => state.genericSlice);

  useEffect(() => {
    dispatch(getCommunityAction());
  }, []);
  return (
    <div className="">
      <h2 className="text-[#fff] text-[30px] mt-10 mx-40">COMMUNITY</h2>
      <div
        id="community-content-bg-container"
        className="w-full h-[100vh] flex flex-col items-center justify-center bg-no-repeat bg-cover"
        style={{ backgroundImage: `url(${map})` }}
      >
        {/* <img src={map} alt="" className="w-[100%] h-[100%]" /> */}

        <div className="top[50px] flex flex-col justify-center items-center">
          <h5 className="text-[#fff] text-base">Total Views:</h5>
          <p className="text-[#fff] text-5xl my-5">
            {(community?.allViews).toLocaleString("en-US")}
          </p>
          <h5 className="text-[#fff] text-base">Countries Reached:</h5>

          <p className="text-[#fff]  text-5xl">
            {(community?.countryCount).toLocaleString("en-US")}
          </p>
        </div>
      </div>

      <div
        id="community-wrap1"
        className="flex justify-between mt-16 items-center mx-40"
      >
        {community?.thanksNote[0] != undefined && (
          <div className="mb-10">
            <div className="flex">
              {/* <img
                  src={user}
                  alt=""
                  className="w-[33px] h-[33px] rounded-[50%]"
                /> */}
              <div className="flex flex-col ml-5">
                <h3 className="text-[14px] font-normal text-[#fff]">
                  {`${community?.thanksNote[0]?.user?.first_name} ${community?.thanksNote[0]?.user?.last_name}`}
                </h3>
                <span className="text-[14px] text-[#fff]">
                  {moment(community?.thanksNote[0]?.createdAt).calendar()}
                </span>
              </div>
            </div>

            <p className="text-[13px] font-normal text-[#fff] mt-3 ml-5">
              {community?.thanksNote[0]?.note}
            </p>
          </div>
        )}

        <AppBtn
          title="VIEW THANK YOU NOTES"
          id="community-thanks-yn-btn"
          onClick={() => navigate("/viewThankYou")}
          className="text-[#fff] text-xl h-16 px-10 bg-[#EB440F] font-medium rounded-[20px]"
        />
      </div>
    </div>
  );
}

export default Community;
