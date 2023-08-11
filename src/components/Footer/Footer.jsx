import React, { useEffect } from "react";
import apple from "../../assets/images/apple.png";
import google from "../../assets/images/google.png";
import {
  FaDiscord,
  FaFacebook,
  FaPrayingHands,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import "./Footer.css";
import { useState } from "react";

const Footer = () => {
  const [activeTab, setActiveTab] = useState("Watch");
  const list = [
    {
      name: "Watch",
      link: "/",
      icon: <FaYoutube size={30} color="white" />,
      iconActive: <FaYoutube size={30} color="#EB440F" />,
    },
    {
      name: "Pay It Forward",
      link: "/payFwd",
      icon: <FaPrayingHands size={30} color="white" />,
      iconActive: <FaPrayingHands size={30} color="#EB440F" />,
    },
    {
      name: "Community",
      link: "/community",
      icon: <MdGroups size={30} color="white" />,
      iconActive: <MdGroups size={30} color="#EB440F" />,
    },
  ];

  const routeList = [
    {
      name: "Watch",
      list: ["/", "/singleVideo", "/video", "/watch", "/authenticate"],
    },
    {
      name: "Pay It Forward",
      list: ["/payFwd"],
    },
    {
      name: "Community",
      list: ["/community"],
    },
  ];

  const navigate = useNavigate();

  useEffect(() => {
    //  try to update the route
    const __route = window.location.pathname;
    // alert(__route)
    routeList.map((item1) => {
      if (item1.list.includes(__route)) {
        setActiveTab(item1.name);
      }
    });
  }, [navigate]);
  return (
    <>
      <div id="desktop-footer" className="bg-[#000] py-20 px-20">
        <div
          style={{ alignItems: "flex-start" }}
          className="flex justify-between"
        >
          <div className="flex flex-col">
            <h4 className="text-[#fff] text-3xl font-medium mb-[10px]">
              Watch
            </h4>

            <Link
              to="/about"
              className="text-xl text-[#fff] font-normal mb-[6px]"
            >
              Christspiracy
            </Link>
            <Link
              to="/thank-you-note"
              className="text-xl text-[#fff] font-normal mb-[6px]"
            >
              Christspiracy
            </Link>
            <Link
              to="/payFwd"
              className="text-xl text-[#fff] font-normal mb-[6px]"
            >
              Christspiracy
            </Link>
            <Link
              to="/help"
              className="text-xl text-[#fff] font-normal mb-[6px]"
            >
              Christspiracy
            </Link>
          </div>

          <div className="flex flex-col mx-12">
            <h4 className="text-[#fff] text-3xl font-medium mb-[10px]">
              Extended Interview
            </h4>

            <Link
              to="/about"
              className="text-xl text-[#fff] font-normal mb-[6px]"
            >
              Christspiracy
            </Link>
            <Link
              to="/thank-you-note"
              className="text-xl text-[#fff] font-normal mb-[6px]"
            >
              Christspiracy
            </Link>
            <Link
              to="/payFwd"
              className="text-xl text-[#fff] font-normal mb-[6px]"
            >
              Christspiracy
            </Link>
            <Link
              to="/help"
              className="text-xl text-[#fff] font-normal mb-[6px]"
            >
              Christspiracy
            </Link>
          </div>

          <div className="flex flex-col">
            <h4 className="text-[#fff] text-3xl font-medium mb-[10px]">
              Behind-the-scenes
            </h4>

            <Link
              to="/about"
              className="text-xl text-[#fff] font-normal mb-[6px]"
            >
              Christspiracy
            </Link>
            <Link
              to="/thank-you-note"
              className="text-xl text-[#fff] font-normal mb-[6px]"
            >
              Christspiracy
            </Link>
            <Link
              to="/payFwd"
              className="text-xl text-[#fff] font-normal mb-[6px]"
            >
              Christspiracy
            </Link>
            <Link
              to="/help"
              className="text-xl text-[#fff] font-normal mb-[6px]"
            >
              Christspiracy
            </Link>
          </div>

          <div
            style={{ alignItems: "flex-end", width: "30%" }}
            className="flex flex-col"
          >
            <h4 className="text-[#fff] text-3xl font-medium mb-[10px]">
              XSPIRACY
            </h4>

            <div className="flex justify-between items-center ml-60 mb-10 ">
              <FaYoutube className="ml-2" color="#fff" size={25} />
              <FaDiscord className="ml-2" color="#fff" size={25} />
              <FaFacebook className="ml-2" color="#fff" size={25} />
              <FaTwitter className="ml-2" color="#fff" size={25} />
            </div>

            <div style={{ textAlign: "right" }} className="text-[#fff]">
              xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
              xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
              xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            </div>
          </div>
        </div>

        <br />
        <br />

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <div className="flex flex-col">
              <h4 className="text-[#fff] text-3xl font-medium mb-[10px]">
                Legal
              </h4>

              <Link
                to="/privacy"
                className="text-xl text-[#fff] font-normal mb-[10px]"
              >
                Policy of Privacy
              </Link>

              <Link
                to="/terms"
                className="text-xl text-[#fff] font-normal mb-[10px]"
              >
                Terms of Use
              </Link>

              <Link
                to="/help"
                className="text-xl text-[#fff] font-normal mb-[10px]"
              >
                Help
              </Link>
            </div>
          </div>

          <div className="flex">
            <img src={apple} alt="" className="w-[160px] h-[40px]" />
            <img src={google} alt="" className="w-[160px] h-[48px]" />
          </div>
        </div>

        <p className="text-center text-[#fff] font-medium mt-10">
          Copywrite @christspiracy 2023
        </p>
      </div>

      <div id="mobile-footer">
        <div id="mobile-footer-container">
          {list.map((item) => {
            return (
              <div
                onClick={() => navigate(item.link)}
                className="floating-footer-item"
              >
                {activeTab == item.name ? item.iconActive : item.icon}
                <div
                  className="floating-footer-title"
                  style={{
                    color: activeTab == item.name ? "#EB440F" : "white",
                  }}
                >
                  {item.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Footer;
