import React, { useEffect, useRef, useState } from "react";
import vid from "../../assets/videos/video2.mp4";
import thumbnail from "../../assets/images/thumbnail.png";
import "./CarouselVideoDetails.css";
import { useSelector } from "react-redux";
import SearchInput from "../../components/SearchInput/SearchInput";
import ReactPlayer from "react-player";
import PlayerControl from "../../components/VideoPlayer/PlayerControl";
import { formatTime } from "../../utils/format";
import Controls from "./Controls";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

function CarouselVideoDetails() {
  const [search, setSearch] = useState("");

  return (
    <div className=" container px-20  pt-[70px]">
      <div className="w-full flex justify-between">
        <h2 className="text-[#fff] text-5xl">Extended Interviews</h2>
        <SearchInput value={search} onChange={setSearch} />
      </div>

      <div className="mt-[60px] grid-cols-4">
        <div className="flex flex-col gap-5">
          <Link className="w-full relative cursor-pointer">
            <img src={thumbnail} alt="" className="h-[305px] w-[100%]" />
            <div className="absolute top-40 left-40 text-[#fff]">
              <h4 className="text-3xl">CHRISTSPIRACY</h4>
              <p className="text-xl">121 MINUTES</p>
            </div>
            <BsFillPlayCircleFill
              color="#fff"
              size={30}
              className="absolute top-[50%] left-[50%]"
            />
          </Link>
          <Link className="w-full relative cursor-pointer">
            <img src={thumbnail} alt="" className="h-[305px] w-[100%] " />
            <div className="absolute top-40 left-40 text-[#fff]">
              <h4 className="text-3xl">CHRISTSPIRACY</h4>
              <p className="text-xl">121 MINUTES</p>
            </div>

            <BsFillPlayCircleFill
              color="#fff"
              size={30}
              className="absolute top-[50%] left-[50%]"
            />
          </Link>
          <Link className="w-full relative cursor-pointer">
            <img src={thumbnail} alt="" className="h-[305px] w-[100%]" />
            <div className="absolute top-40 left-40 text-[#fff]">
              <h4 className="text-3xl">CHRISTSPIRACY</h4>
              <p className="text-xl">121 MINUTES</p>
            </div>

            <BsFillPlayCircleFill
              color="#fff"
              size={30}
              className="absolute top-[50%] left-[50%]"
            />
          </Link>
          <Link className="w-full relative cursor-pointer">
            <img src={thumbnail} alt="" className="h-[305px] w-[100%]" />
            <div className="absolute top-40 left-40 text-[#fff]">
              <h4 className="text-3xl">CHRISTSPIRACY</h4>
              <p className="text-xl">121 MINUTES</p>
            </div>
            <BsFillPlayCircleFill
              color="#fff"
              size={30}
              className="absolute top-[50%] left-[50%]"
            />
          </Link>
          <Link className="w-full relative cursor-pointer">
            <img src={thumbnail} alt="" className="h-[305px] w-[100%]" />
            <div className="absolute top-40 left-40 text-[#fff]">
              <h4 className="text-3xl">CHRISTSPIRACY</h4>
              <p className="text-xl">121 MINUTES</p>
            </div>

            <BsFillPlayCircleFill
              color="#fff"
              size={30}
              className="absolute top-[50%] left-[50%]"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CarouselVideoDetails;
