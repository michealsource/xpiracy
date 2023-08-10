import React, { useEffect, useRef, useState } from "react";

import Slider from "@mui/material/Slider";
import { alpha, styled } from "@mui/material/styles";
import { FaPause, FaPlay } from "react-icons/fa";
import { BsVolumeDownFill, BsFillVolumeMuteFill } from "react-icons/bs";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { LuPauseCircle } from "react-icons/lu";
import { RiPauseMiniFill } from "react-icons/ri";
import play from "../../assets/images/play.png";
import next from "../../assets/images/next.png";
import back from "../../assets/images/back.png";
import maximixe from "../../assets/images/maximixe.png";
import "./VideoPlayer.css";
import { useSelector } from "react-redux";

const PrettoSlider = styled(Slider)(({ theme }) => ({
  width: 300,
  color: theme.palette.success.main,
  "& .MuiSlider-thumb": {
    "&:hover, &.Mui-focusVisible": {
      boxShadow: `0px 0px 0px 8px ${alpha(theme.palette.success.main, 0.16)}`,
    },
    "&.Mui-active": {
      boxShadow: `0px 0px 0px 14px ${alpha(theme.palette.success.main, 0.16)}`,
    },
  },
}));

function PlayerControl({
  onPlayPause,
  playing,
  onRewind,
  onFastFward,
  muted,
  onMute,
  onVolumechange,
  onVolumeSeekUp,
  volume,
  onToggleFullScreen,
  played,
  onSeek,
  onSeekMouseUp,
  onSeekMouseDown,
  duration,
  currentTime,
  urlNormal = null,
  urlFourK = null,
  url = null,
  setUrl = ()=>{}
}) {
  const {hasPaidBefore} = useSelector(state => state.genericSlice)
  const [visible, setVisible] = useState();
  const [presentQuality, setPresentQuality] = useState((!hasPaidBefore) ? 'normal' : 'fourk');

  const visibleRef = useRef(0);
  
  const enter = ()=>{
    // console.log('enter')
    setTimeout(()=> {
      visibleRef.current = 1;
    }, 2)
  }
  const left = ()=>{
    // console.log('left')
    setTimeout(()=> {
      visibleRef.current = 0;
    }, 2500)
  }

  useEffect(()=>{
    if( visibleRef.current == 1 ){
      setVisible(true);
    }else{
      setVisible(false);
    }
  }, [visibleRef.current]);

  useEffect(()=>{
    left()
  }, [])

  useEffect(()=>{
    if(presentQuality == 'normal'){
      setUrl(urlNormal)
    }else{
      setUrl(urlFourK)
    }
  }, [presentQuality])


  return (
    <div
      onMouseEnter={()=> enter()}
      onMouseMove={()=> enter()}
      onMouseOut={()=> left()}
      style={{
        opacity: (visible) ? 1 : 0
      }}
      className="controls-wrapper">
      <div className="flex items-center h-[100%] justify-center gap-48 w-full p-5">
        <div>
          <img
            src={back}
            alt=""
            className="w-[50px] h-[50px] cursor-pointer"
            onClick={onRewind}
          />
        </div>

        <div>
          {playing ? (
            <LuPauseCircle
              color="#fff"
              size={50}
              onClick={onPlayPause}
              className="cursor-pointer"
            />
          ) : (
            <AiOutlinePlayCircle
              color="#fff"
              size={50}
              className=" cursor-pointer"
              onClick={onPlayPause}
            />
            // <img
            //   src={play}
            //   alt=""
            //   className="w-[58px] h-[58px] cursor-pointer"
            //   onClick={onPlayPause}
            // />
          )}
        </div>

        <div>
          <img
            src={back}
            alt=""
            className="w-[50px] h-[50px] cursor-pointer"
            onClick={onFastFward}
          />
        </div>
      </div>

      <div className="flex justify-between items-center p-5">
        <div className="w-full">
          <PrettoSlider
            min={0}
            max={100}
            sx={{
              width: "100%",
              color: "#fff",
            }}
            value={played * 100}
            onChange={onSeek}
            onChangeCommitted={onSeekMouseUp}
            onMouseDown={onSeekMouseDown}
          />
          {/* <Slider min={0} max={100} className="cursor-pointer" /> */}
        </div>
      </div>

      <div className="flex justify-between  p-5">
        <div  style={{ display: 'flex', flex: 0.6 }} className="flex items-center gap-5">
          {playing ? (
            <RiPauseMiniFill
              size={25}
              color="#fff"
              className="cursor-pointer w-[25px]"
              onClick={onPlayPause}
            />
          ) : (
            <FaPlay
              size={20}
              color="#fff"
              className="cursor-pointer w-[25px]"
              onClick={onPlayPause}
            />
          )}

          <div className="flex items-center">
            {muted ? (
              <BsFillVolumeMuteFill
                size={25}
                color="#fff"
                className="cursor-pointer"
                onClick={onMute}
              />
            ) : (
              <BsVolumeDownFill
                size={25}
                color="#fff"
                className="cursor-pointer"
                onClick={onMute}
              />
            )}

            <div className="ml-10 mr-10">
              <Slider
                onChange={onVolumechange}
                value={volume * 100}
                onChangeCommitted={onVolumeSeekUp}
                sx={{
                  width: 50,
                  color: "#fff",
                }}
              />
            </div>

            {/* <Slider
              min={0}
              max={100}
              defaultValue={volume * 100}
              className="w-[200px] ml-3 mr-5 cursor-pointer"
              draggableTrack={onVolumeSeekDown}
              onChange={onVolumechange}
            /> */}
            <span className="text-[#fff] ml-4 inline-block">
              {currentTime} : {duration}
            </span>
          </div>
        </div>

        <div className={`flex ${ hasPaidBefore ? 'justify-between' : 'justify-end'}`} style={{ display: 'flex', flex: 0.4 }}>
          {
            (hasPaidBefore) &&
            (<div style={{ color: 'white' }}>
              <span onClick={()=> setPresentQuality('normal')} style={{ color: (presentQuality == 'normal') ? 'red' : 'white', cursor: 'pointer' }}>normal</span>
              <span style={{ marginLeft: 5, marginRight: 5, }}>•</span> 
              <span onClick={()=> setPresentQuality('fourk')} style={{ color: (presentQuality != 'normal') ? 'red' : 'white', cursor: 'pointer' }}>4K</span>
            </div>)
          }
          <img
            src={maximixe}
            alt=""
            className="w-[28px] h-[28px] cursor-pointer z-50"
            onClick={onToggleFullScreen}
          />
        </div>
        
      </div>
    </div>
  );
}

export default PlayerControl;
