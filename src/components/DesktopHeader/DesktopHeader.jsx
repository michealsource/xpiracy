import React, { useState } from "react";
import { FaBell, FaLanguage, FaQuestionCircle, FaUser } from "react-icons/fa";
import AppBtn from "../AppBtn/AppBtn";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "./Header.css";
import { clearToken, getToken } from "../../redux/storage";
import { useDispatch, useSelector } from "react-redux";
import { clearUserData } from "../../redux/reducers/authentication";

function DesktopHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector((_) => _.authenticationSlice);

  const { pathname } = useLocation();

  console.log("userData", userData);

  const [userLink, setUserLink] = useState("/authenticate");
  const isSignedIn = getToken() != null;
  return (
    <div>
      <div
        // style={{ boxShadow: "2px 2px 2px #CBC5B6" }}
        id="desktop-header"
        className="w-full  flex bg-[#000] h-[80px]"
      >
        <div className="flex w-[100%] px-20  mx-auto justify-between items-center ">
          <div className="flex items-center">
            <h3
              className="text-[#FFF] text-[24px] font-bold cursor-pointer"
              onClick={() => navigate("/")}
            >
              XPIRACY
            </h3>

            <div className="ml-[50px] flex gap-6">
              <Link
                style={{
                  ...(pathname == "/" || pathname.includes("/watch")
                    ? {
                        borderBottomColor: "#E93C24",
                        borderBottomWidth: 3,
                        paddingBottom: 3,
                      }
                    : {}),
                }}
                to="/"
                className="font-medium text-[#FFF] text-lg"
              >
                Watch
              </Link>
              <Link
                style={{
                  ...(pathname == "/payFwd"
                    ? {
                        borderBottomColor: "#E93C24",
                        borderBottomWidth: 3,
                        paddingBottom: 3,
                      }
                    : {}),
                }}
                to="/payFwd"
                className="text-[#FFF] text-lg"
              >
                Pay It Forward
              </Link>
              <Link
                style={{
                  ...(pathname == "/extras"
                    ? {
                        borderBottomColor: "#E93C24",
                        borderBottomWidth: 3,
                        paddingBottom: 3,
                      }
                    : {}),
                }}
                to="/extras"
                className="font-medium text-[#FFF] text-lg"
              >
                Extras
              </Link>

              <Link
                style={{
                  ...(pathname == "/community"
                    ? {
                        borderBottomColor: "#E93C24",
                        borderBottomWidth: 3,
                        paddingBottom: 3,
                      }
                    : {}),
                }}
                to="/community"
                className="font-medium text-[#FFF] text-lg"
              >
                Community
              </Link>
              <Link to="/facts" className="font-medium text-lg text-[#FFF]">
                Facts
              </Link>
            </div>
          </div>
          {isSignedIn ? (
            <Link
              // onClick={() => {
              //   dispatch(clearUserData());
              //   clearToken();
              //   window.location.replace("/");
              // }}
              className="flex items-center"
            >
              <Link
                to="/profile"
                className="border-[1px] w-[30px] h-[30px] text-center rounded-[50%] p-2 border-[#EB440F] text-white"
              >
                {userData?.user?.email[0] || "A"}
              </Link>
              {/* <FaBell color="#EB440F" size={20} /> */}
              <AppBtn
                title="LOG OUT"
                onClick={() => {
                  dispatch(clearUserData());
                  clearToken();
                  window.location.replace("/");
                }}
                className="bg-[#EB440F] text-white font-medium p-3 px-5 rounded-[20px] ml-10"
              />
            </Link>
          ) : (
            <div className="flex items-center gap-5">
              <Link to="/authenticate" className="flex items-center">
                {/* <FaBell color="#EB440F" size={20} /> */}
                {/* <FaCircleQuestion color="#EB440F" size={20} /> */}
                <FaLanguage color="#FFF" size={20} />
                <FaQuestionCircle className="ml-3" color="#FFF" size={20} />
                <AppBtn
                  title="LOG IN"
                  className="border-[#EB440F] text-[#FFF] border-[1px] font-medium p-3 px-5 rounded-[20px] ml-5"
                />
              </Link>
              {/* <Link to="/registration" className="flex items-center">
                <AppBtn
                  title="SIGN UP"
                  className="bg-[#EB440F] font-medium p-3 px-5 rounded-[20px]"
                />
              </Link> */}
            </div>
          )}
        </div>
      </div>

      <div id="mobile-header">
        <FaBell color="white" size={29} />
        <h2>XPIRACY</h2>
        {isSignedIn ? (
          <Link
            to="/profile"
            className="border-[1px] w-[30px] h-[30px] text-center rounded-[50%] p-2 border-[#EB440F] text-white"
          >
            {userData?.user?.email[0] || "A"}
          </Link>
        ) : (
          <FaUser color="white" size={29} onClick={() => navigate(userLink)} />
        )}
      </div>
    </div>
  );
}

export default DesktopHeader;
