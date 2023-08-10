import React from "react";
import "./VideoPlayer.css";
import ReactPlayer from "react-player";
import { FaUser } from "react-icons/fa";
import AppBtn from "../AppBtn/AppBtn";
import { useSelector } from "react-redux";
import "./index.css";

export default function PTFCover({
  name,
  _object,
  setshowThankYouNoteModal,
  url,
  playing,
  onPlayPause,
  currentTime,
  showPayItForwardCover,
  setshowPayItForwardCover,
  handleOpen,
}) {
  const { hasPaidBefore } = useSelector((state) => state.genericSlice);

  console.log(hasPaidBefore);
  if (hasPaidBefore) {
    return null;
  }

  if (!showPayItForwardCover) {
    return null;
  }

  return (
    <div className="ptf-wrapper">
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div>
          {/* <FaUser size={40} color='white' /> */}
          <img
            className="rounded"
            src={_object?.picture}
            style={{
              width: 72,
              height: 72,
              borderRadius: 50,
              borderWidth: 3.5,
              borderColor: "#E93C24",
            }}
          />
        </div>
        <div
          className="text-3xl font-medium my-8"
          style={{ color: "white", textAlign: "center" }}
        >
          This was made free to you by {name}
        </div>
        <div
          className="text-xl my-4 text-[#fff]"
          style={{ textAlign: "center" }}
        >
          {name} made this free for you to <br /> watch Christspiracy
        </div>
        <div>
          <AppBtn
            title="SAY THANK YOU"
            onClick={() => {
              // setTimeout(()=>{
              //     window.open('/thank-you-note');
              // }, 300)
              onPlayPause();
              handleOpen();
              setshowPayItForwardCover(false);
            }}
            style={{
              backgroundColor: "rgba(233, 60, 36, 0.5)",
            }}
            className="mt-3 text-[16px]  w-full  text-[#fff] font-medium py-3 px-6 rounded-[12px] "
          />

          <div
            onClick={() => {
              // onPlayPause();
              setshowPayItForwardCover(false);
            }}
            style={{
              cursor: "pointer",
              textAlign: "center",
              color: "white",
              textDecoration: "underline",
              marginTop: 12,
            }}
          >
            Continue Watching
          </div>
        </div>
      </div>

      {/* <div id="videoWrapper1">
            <ReactPlayer
                url={url}
                muted={true}
                width={'100%'}
                height={400}
                playing={true}
                ref={ref => {
                    ref?.seekTo(currentTime);
                }}
                />
            </div> */}
    </div>
  );
}
