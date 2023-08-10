import React, { useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { FiChevronRight } from "react-icons/fi";
import { Thumbnail } from "../../constants/mocData";
import { FaChevronLeft, FaChevronRight, FaPlay } from "react-icons/fa";
import ReactPlayer from "react-player";

function GeneralCarousel({ title, data = [], isLocked = false }) {
  const [_id, _setId] = useState(
    parseInt(Math.random() * 100) + 1 + (parseInt(Math.random() * 100) + 1)
  );
  const slideLeft = () => {
    console.log(_id);
    var slider = document.getElementById("slider" + _id);
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    console.log(_id);
    var slider = document.getElementById("slider" + _id);
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  const [activeId, setActiveId] = useState(0);

  console.log(isLocked, "is locked");

  const Viewer = ({ item }) => {
    const [showMiniModal, setShowMiniModal] = useState(false);

    // console.log(item);

    return (
      <div
        onMouseEnter={() => {
          console.log("moving: ", item.id);
          if (!isLocked) {
            setActiveId(item.id);
          } else {
            setShowMiniModal(true);
            console.log("reached: ");
          }
        }}
        onMouseLeave={() => {
          console.log("leave: ", 0);
          setActiveId(0);
          setShowMiniModal(false);
        }}
        style={{
          width: 220,
          height: 260,
          display: "inline-block",
          position: "relative",
          cursor: "pointer",
        }}
      >
        {showMiniModal && (
          <div
            style={{
              zIndex: 999,
              position: "absolute",
              background: "white",
            }}
            className="rounded-lg bg-danger-100 px-6 py-5 text-base"
          >
            paying it forward is required <br /> to access exclusive contents
          </div>
        )}
        <ReactPlayer
          width={220}
          height={260}
          light={
            <img
              className="w-[220px] inline-block h-[260px] p-2 cursor-pointer hover:scale-105 ease-in-out duration-300"
              // src={"https://images.unsplash.com/photo-1566024287286-457247b70310?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fG9jZWFufGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=800&q=60"}
              // src={Thumbnail}
              src={item.coverImage}
              // title={isLocked ? "pay it forward is required to access exclusive contents" : ""}
              alt="/"
            />
          }
          // playIcon={
          //   <div style={{ position: 'absolute' }}>
          //     <FaPlay size={48} color="white" />
          //   </div>
          // }
          playing={false}
          controls={isLocked ? false : activeId === item.id}
          style={{
            display: "inline-block",
            cursor: "pointer",
          }}
          url={item.url}
        />

        {/* <div style={{ color: 'red', background: 'red', height: 300 }}>
            a
          </div> */}
      </div>
    );
  };

  return (
    <>
      <h3 className="text-[18px] flex items-center mt-20 text-[#fff] px-20 font-bold">
        <span>{title}</span>
        <FiChevronRight className=" ml-5" color="#EB440F" size={21} />
      </h3>
      <div
        style={{ overflow: "hidden" }}
        className="relative flex items-center mt-12"
      >
        <FaChevronLeft
          className="opacity-50 cursor-pointer mr-5 hover:opacity-100"
          onClick={slideLeft}
          size={30}
          color="#fff"
        />
        <div
          id={"slider" + _id}
          className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide"
        >
          {data.map((item) => (
            // <img
            //   className="w-[220px] inline-block h-[260px] p-2 cursor-pointer hover:scale-105 ease-in-out duration-300"
            //   src={item.img}
            //   alt="/"
            // />

            <Viewer item={item} />
          ))}
        </div>
        <FaChevronRight
          className="opacity-50 cursor-pointer ml-5 hover:opacity-100"
          onClick={slideRight}
          size={30}
          color="#fff"
        />
      </div>
    </>
  );
}

export default GeneralCarousel;
