import React, { useEffect, useState } from "react";
import user from "../../assets/images/user.png";
import { AiFillCamera } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import settings from "../../assets/images/settings.png";
import charityWhite from "../../assets/images/charityWhite.png";
import { BiSolidHelpCircle } from "react-icons/bi";
import { FaQuestionCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { APP_CONFIG } from "../../config/settings";
import axiosClient from "../../api/axios";
import { getProfileAction } from "../../redux/actions/genericAction";

function Profile() {
  const [active, setActive] = useState(true);
  const [passport, setPassport] = useState("");
  const [realImageFile, setRealImageFile] = useState("");
  const dispatch = useDispatch();
  const { userData } = useSelector((_) => _.authenticationSlice);
  const { profileData } = useSelector((_) => _.genericSlice);

  // console.log("profileData", profileData);

  const navigate = useNavigate();

  const handleChangePassport = (event) => {
    const fileList = event.target.files;
    setPassport(event.target.files[0]);
    updateImage(event.target.files[0]);
    const imageURL = URL.createObjectURL(fileList[0]);
    setRealImageFile(imageURL);
  };

  useEffect(() => {
    if (profileData != null) {
      if (profileData?.picture != null) {
        let pic = `${APP_CONFIG.BASE_URL}${profileData?.picture}`;
        console.log("profileData", pic);
        setRealImageFile(pic);
      }
    }
  }, [profileData]);

  useEffect(() => {
    dispatch(getProfileAction());
  }, []);

  const updateImage = async (image) => {
    const fd = new FormData();
    fd.append("picture", image);
    await axiosClient().put("profile/update", fd);
  };

  console.log(profileData?.email, "emaill");

  return (
    <div className="px-20 text-[#fff] pt-14">
      <h3 className="text-[#fff] text-5xl">Profile</h3>
      <div className="w-full flex items-center justify-center mt-10">
        <div className="flex flex-col justify-center items-center">
          <div className="w-[100px] h-[100px] flex items-center justify-center rounded-full border-[5px] mb-8 border-[#E93C24]">
            {realImageFile != "" ? (
              <img
                src={realImageFile}
                alt=""
                className="w-[100%] rounded-full "
                style={{ borderRadius: 100, height: "100%" }}
              />
            ) : (
              <span className="cursor-pointer text-center font-bold text-5xl">
                {profileData?.email[0] || "M"}
              </span>
            )}
          </div>

          <p className="text-2xl text-center">{`${profileData?.first_name} ${profileData?.last_name}`}</p>
          <p className="text-xl text-center">{profileData?.email}</p>

          <div className="flex gap-10 mt-10">
            <div className="bg-[#E93C24] hover:bg-[#ae3c2d]  rounded-full p-4 ">
              <input
                type="file"
                id="other-btn"
                hidden
                onChange={handleChangePassport}
              />

              <label for="other-btn" className="cursor-pointer text-center">
                <AiFillCamera size={20} className="cursor-pointer" />
              </label>
            </div>
            <div className="bg-[#E93C24] hover:bg-[#ae3c2d]  rounded-full  p-4">
              <MdEdit
                size={20}
                className="cursor-pointer"
                onClick={() => navigate("/edit-profile")}
              />
            </div>
          </div>

          <div className="flex gap-32 mt-20">
            <div
              className="flex flex-col items-center justify-center cursor-pointer"
              onClick={() => setActive(true)}
            >
              <img src={charityWhite} alt="" className="w-[40px] h-[40px]" />
              <span className="text-base inline-block mt-3">My Impact</span>
              {active && <div className="dash" />}
            </div>

            <div
              className="flex flex-col items-center justify-center cursor-pointer"
              onClick={() => setActive(false)}
            >
              <img src={settings} alt="" className="w-[40px] h-[40px]" />
              <span className="text-base inline-block mt-3">Settings</span>
              {!active && <div className="dash" />}
            </div>
          </div>

          {active && (
            <div className="mt-20 mb-10">
              <h3 className="text-2xl font-bold mb-5">My Impact</h3>
              <div className="flex gap-10">
                <div className="bg-[#D9D9D9] text-[#000] px-10 py-5 rounded-2xl h-[70px]">
                  <h6 className="text-base font-normal">
                    People I have Impacted
                  </h6>
                  <h2 className="font-bold text-xl">
                    {profileData?.payitforwardCount || "0"}
                  </h2>
                </div>
                <div className="bg-[#D9D9D9] text-[#000] px-10 pt-5 rounded-2xl h-[70px]">
                  <h6 className="text-base font-normal">Thank yous recieved</h6>
                  <h2 className="font-bold text-xl">
                    {profileData?.myThankYouNoteCount || "0"}
                  </h2>
                </div>
              </div>
            </div>
          )}

          {!active && (
            <div className="mt-20 mb-10">
              <h3 className="text-2xl font-bold mb-5">Settings</h3>
              <div className="">
                <div className="flex text-[#000]  py-5 rounded-2xl h-[70px]">
                  <div className="relative">
                    <div className="bg-[#D9D9D9] p-3 font-bold">A</div>
                    <div className="bg-[#D9D9D9] p-3 font-bold absolute top-10 left-8">
                      B
                    </div>
                  </div>

                  <h6 className="text-2xl ml-12 mt-10 font-normal text-[#fff]">
                    Beta Languages
                  </h6>
                </div>
                <div
                  onClick={() => navigate("/help")}
                  className="pt-5 cursor-pointer rounded-2xl items-center flex h-[70px]"
                >
                  <FaQuestionCircle color="#D9D9D9" size={25} />
                  <h6 className="text-2xl font-normal ml-12">Help</h6>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
