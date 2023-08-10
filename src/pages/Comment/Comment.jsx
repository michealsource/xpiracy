import React, { useRef, useState } from "react";
import Slider from "@mui/material/Slider";
import screenfull from "screenfull";
import "../../components/VideoPlayer/VideoPlayer.css";
import ReactPlayer from "react-player";
import vid from "../../assets/videos/test.mp4";
import send from "../../assets/images/send.png";

import { formatTime } from "../../utils/format";
import PlayerControl from "../../components/VideoPlayer/PlayerControl";
import SingleThankYou from "../../components/SingleThankYou/SingleThankYou";

function Comment() {
  const [videoState, setVideoState] = useState({
    playing: false,
    muted: false,
    volume: 0.5,
    played: 0,
    seeking: false,
  });

  const { playing, muted, volume, played, seeking } = videoState;
  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);
  const controlRef = useRef(null);
  const handlePlayPause = () => {
    setVideoState({ ...videoState, playing: !videoState.playing });
  };

  const handleRewind = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
  };

  const handleFastForward = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
  };

  const handleMute = () => {
    setVideoState({ ...videoState, muted: !videoState.muted });
  };

  const handleVolumeChange = (e, value) => {
    const newVolume = parseFloat(value) / 100;

    setVideoState({
      ...videoState,
      volume: newVolume,
      muted: Number(newVolume) === 0 ? true : false,
    });
  };

  const handleVolumeSeekUp = (e, newValue) => {
    setVideoState({
      ...videoState,
      volume: parseFloat(newValue / 100),
      muted: newValue === 0 ? true : false,
    });
  };

  const toggleFullscreen = () => {
    screenfull.toggle(playerContainerRef.current);
  };

  const progressHandler = (state) => {
    // if (count > 3) {
    //   console.log("close");
    //   controlRef.current.style.visibility = "hidden"; // toggling player control container
    // } else if (controlRef.current.style.visibility === "visible") {
    //   count += 1;
    // }

    if (!seeking) {
      setVideoState({ ...videoState, ...state });
    }
  };

  const handleSeekChange = (e, value) => {
    setVideoState({ ...videoState, played: parseFloat(value / 100) });
    playerRef.current.seekTo(parseFloat(value / 100));
  };

  const handleSeekMouseDown = () => {
    setVideoState({ ...videoState, seeking: true });
  };

  const handleSeekMouseUp = (E, newValue) => {
    setVideoState({ ...videoState, seeking: false });
    playerRef.current.seekTo(newValue / 100);
  };

  const currentTime = playerRef.current
    ? playerRef.current.getCurrentTime()
    : "00:00";
  const duration = playerRef.current
    ? playerRef.current.getDuration()
    : "00:00";

  const formatCurrentTime = formatTime(currentTime);
  const formatDuration = formatTime(duration);
  return (
    <>
      <div ref={playerContainerRef} className="w-full h-[50%] videoWrapper">
        <ReactPlayer
          ref={playerRef}
          url={vid}
          muted={muted}
          width="100%"
          height="100%"
          playing={playing}
          volume={volume}
          onProgress={progressHandler}
        />

        <PlayerControl
          controlRef={controlRef}
          onPlayPause={handlePlayPause}
          playing={playing}
          onRewind={handleRewind}
          onFastFward={handleFastForward}
          muted={muted}
          onMute={handleMute}
          onVolumechange={handleVolumeChange}
          onVolumeSeekUp={handleVolumeSeekUp}
          volume={volume}
          onToggleFullScreen={toggleFullscreen}
          played={played}
          onSeek={handleSeekChange}
          onSeekMouseUp={handleSeekMouseUp}
          onSeekMouseDown={handleSeekMouseDown}
          duration={formatDuration}
          currentTime={formatCurrentTime}
        />
      </div>
      <div className="container px-40 ">
        <SingleThankYou className="w-[100%]" />
        <SingleThankYou />
        <SingleThankYou />
        <SingleThankYou />

        <div className="w-[100%] max-w-3xl items-center border-[#fff] border-[1px] rounded-[15px] h-[40px] bg-[#000] relative flex">
          <input
            type="text"
            placeholder="Leave Comment"
            className="w-[100%] h-[100%] bg-transparent text-[14px] text-[#fff] px-10 focus:outline-none"
          />
          <img
            src={send}
            alt=""
            className="w-[30px] h-[30px] mr-5 cursor-pointer"
          />
        </div>
      </div>
    </>
  );
}

export default Comment;
