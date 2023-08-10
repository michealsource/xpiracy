import React, { useState } from "react";
import christ from "../../assets/images/emmanuel.jpeg";
import ReactPlayer from "react-player";
import { Thumbnail } from "../../constants/mocData";
// import { Thumbnail } from "../../constants/mocData";

function ExtraCard({ data = {} }) {
  const [activeId, setActiveId] = useState(0);
  return (
    <div className="flex flex-col mb-14">
      {/* <img
        class="w-full h-60 object-conatin rounded-sm object-center"
        src={christ}
        alt="Card Image"
      /> */}

      <div
        onMouseEnter={() => {
          console.log("moving: ", data.id);
          setActiveId(data.id);
        }}
        onMouseLeave={() => {
          console.log("leave: ", 0);
          setActiveId(0);
        }}
        style={{
          width: "100%",
          height: 260,
          display: "inline-block",
          cursor: "pointer",
        }}
      >
        <ReactPlayer
          width={"100%"}
          height={260}
          light={
            <img
              className="w-[220px] inline-block h-[260px] p-2 cursor-pointer hover:scale-105 ease-in-out duration-300"
              // src={"https://images.unsplash.com/photo-1566024287286-457247b70310?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fG9jZWFufGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=800&q=60"}
              src={Thumbnail}
              alt="/"
            />
          }
          controls={activeId === data.id}
          style={{
            display: "inline-block",
            cursor: "pointer",
          }}
          url={data.url}
        />
      </div>

      <div className="flex flex-col  w-[80%] ml-10">
        <h3 className="text-xl font-medium text-[#fff] text-[10px] mt-[28px]">
          {data?.video_name}
        </h3>
        <span className="mt-3 text-[#fff] font-light">
          CHRISTSPIRACY: {data?.keyword}
        </span>
        <span className=" text-[#fff] font-light ">
          {parseInt(parseInt(data?.durationInSec) / 60)} MINUTES
        </span>
      </div>
    </div>
  );
}

export default ExtraCard;
