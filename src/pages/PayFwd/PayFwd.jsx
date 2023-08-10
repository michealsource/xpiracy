import React, { useEffect, useRef, useState } from "react";
// import { HiMiniCheckCircle } from "react-icons/hi";
// import fwdImg from "../../assets/svg/jes.svg";
import fwdImg from "../../assets/images/jes.png";
import question from "../../assets/images/question.png";
import mobileApp from "../../assets/images/mobileApp.png";
import videoFrame from "../../assets/images/videoFrame.png";
import { FaCheckCircle } from "react-icons/fa";
import { data } from "../../constants/accodordianData";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

import screenfull from "screenfull";
import "../../components/VideoPlayer/VideoPlayer.css";
import ReactPlayer from "react-player";
import vid from "../../assets/videos/test.mp4";

import AppBtn from "../../components/AppBtn/AppBtn";
import { formatTime } from "../../utils/format";
import PlayerControl from "../../components/VideoPlayer/PlayerControl";
import "./PayFwd.css";
import { useDispatch, useSelector } from "react-redux";
import { getRateAction } from "../../redux/actions/genericAction";
import ReactSlider from "react-slider";
import { getIdPTF, getToken } from "../../redux/storage";
import Swal from "sweetalert2";
import publicIp from "react-public-ip";
import Loader from "../../components/Loader/Loader";
import axiosClient from "../../api/axios";
import AppInput from "../../components/AppInput/AppInput";
import { payFwddata } from "../../constants/payFwdData";

// const publicIp = require("react-public-ip");

const PayFwd = () => {
  const dispatch = useDispatch();
  const { rate } = useSelector((_) => _.genericSlice);
  const { allCollectionData } = useSelector((state) => state.genericSlice);
  const [numberOfPpl, setNumberOfPpl] = useState(1000);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const [selected, setSelected] = useState(0);

  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
  };

  useEffect(() => {
    // get updated rate
    dispatch(getRateAction());
  }, []);
  const [videoState, setVideoState] = useState({
    playing: false,
    muted: false,
    volume: 0.5,
    played: 0,
    seeking: false,
  });

  const processPTF = async (mode, amount = null, numPPl = null) => {
    try {
      setLoading(true);
      // check if user is signed in
      if (getToken() == null) {
        new Swal(
          "Ooops",
          "you must be signed in to perform this action, it only takes a minute",
          "error"
        );
        return;
      }

      // get movieId
      let movieId = getIdPTF();
      if (movieId == null) {
        // randomly pick a movie from collection and update
        movieId = (allCollectionData?.allCollections)[0]?.contents[0]?.id || 2;
      }

      const ipv4 = (await publicIp.v4()) || "";
      const successUrl = `${window.location.protocol}//${window.location.host}/successful-payment`;
      const cancelUrl = `${window.location.protocol}//${window.location.host}`;

      const payload = {
        mode,
        numberOfPeople: (numPPl != null) ? `${numPPl}` : `${numberOfPpl}`,
        movieId,
        ipAddress: ipv4,
        successUrl,
        cancelUrl,
        email,
        ...(amount != null ? {amount} : {})
      };

      console.log(payload);

      const { data } = await axiosClient().post("pay", payload);

      window.location.replace(data.payload);
    } catch (error) {
      new Swal("Ooop...", error?.response?.data?.message || error.message, "");
    }

    setLoading(false);
  };

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

  const screenWidth = window.screen.width;

  // alert(screenWidth)

  return (
    <>
      {loading && <Loader />}
      <div id="desktop-payitforward" className="mb-56  w-4/5  mx-auto">
        <h4 className="text-white text-5xl font-semibold mt-10 ">
          Pay it forward to Christspiracy
        </h4>
        <div className="flex mt-20 gap-56 ">
          <div className="text-white flex-1">
            <div
              ref={playerContainerRef}
              className="w-full h-[50%] videoWrapper"
            >
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

            <div>
              <h2 className="text-[#fff] text-3xl mb-5 mt-20">FAQS</h2>

              <div className="accordian">
                {data.map((item, index) => {
                  return (
                    <div className="item mt-5 text-[#fff]  p-4 cursor-pointer ">
                      <div
                        className="flex justify-between mb-3 items-center"
                        onClick={() => toggle(index)}
                      >
                        <div className="flex gap-5">
                          <span className="inline-block text-2xl">
                            {item?.title}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          {selected === index ? (
                            <BsChevronDown size={20} />
                          ) : (
                            <BsChevronUp size={20} />
                          )}
                        </div>
                      </div>
                      <hr />
                      <>
                        <div
                          className={
                            selected === index
                              ? "content mt-5 show text-lg"
                              : "content text-lg"
                          }
                        >
                          {item.content}
                        </div>
                      </>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* <div className="mt-[40px] px-28">
            <div className="flex flex-col">
              <div className="flex items-center">
                <h3 className="text-[#ffff] text-[30px] mr-5">JOIN US</h3>
                <img src={question} alt="" className="w-[30px] h-[30px]" />
              </div>

              <span className="text-[#ffff]">
                I want to bring the show to: <b>{numberOfPpl}</b> People{" "}
              </span>
              <ReactSlider
                min={100}
                max={100000}
                value={numberOfPpl}
                defaultValue={numberOfPpl}
                className="horizontal-slider"
                thumbClassName="example-thumb"
                trackClassName="example-track"
                onChange={(val) => setNumberOfPpl(val)}
              />
            </div>

            <div className="flex items-center mt-28 mb-3">
              <FaCheckCircle color="#fff" size={20} />
              <span className="text-[#ffff] text-xl ml-5 inline-block">
                Help create future seasons
              </span>
              g
            </div>
            <div className="flex items-center  mb-3">
              <FaCheckCircle color="#fff" size={20} />
              <span className="text-[#ffff] text-xl ml-5 inline-block">
                Pay it forward{" "}
              </span>
            </div>
            <div className="flex items-center  mb-3">
              <FaCheckCircle color="#fff" size={20} />
              <span className="text-[#ffff] text-xl ml-5 inline-block">
                Translate into new languages
              </span>
            </div>
            <div className="flex items-center  mb-3">
              <FaCheckCircle color="#fff" size={20} />
              <span className="text-[#ffff] text-xl ml-5 inline-block">
                Name in season 4 credits
              </span>
            </div>
            <div className="flex items-center  mb-3">
              <FaCheckCircle color="#fff" size={20} />
              <span className="text-[#ffff] text-xl ml-5 inline-block">
                One-day set visit for two people
              </span>
            </div>

            <div className="mt-8">
              <div className="text-white text-sm">
                Pay It Forward on behalf of a friend
              </div>
              <AppInput
                value={email}
                onChange={(val) => setEmail(val)}
                type="email"
                placeholder="EMAIL: optional, use commas for multiple emails"
              />
            </div>

            <div className="flex flex-col mt-10">
              <AppBtn
                onClick={() => processPTF("subscription")}
                title={`PAY $${
                  ((rate?.usd || 1) * numberOfPpl) / (rate?.numberOfPeople || 1)
                } MONTHLY`}
                className="text-[#fff] text-[16px] bg-[#EB440F] font-medium p-3 px-4 rounded-[20px]"
              />
              <AppBtn
                onClick={() => processPTF("payment")}
                title={`ONE TIME PAYMENT OF $${
                  ((rate?.usd || 1) * numberOfPpl) / (rate?.numberOfPeople || 1)
                }`}
                className="text-[#fff] p-4 px-4 rounded-[20px] border-2 mt-5 border-[#EB440F]"
              />

              <div className="flex flex-col items-center justify-center mt-5 w-full">
                <p className="text-[12px] w-[200px] text-[#fff] text-center font-normal">
                  This would help Christspiracy to reach a 1000 more people
                </p>

                <p className="text-[#fff] mt-5 font-medium ">
                  Over 400 people have “paid it forward” globally
                </p>
              </div>
            </div>
          </div> */}

          <div className="text-white h-[600px] overflow-y-auto flex-1">
            <h4 className="text-2xl"> What is Pay it Forward?</h4>
            <p className="text-lg w-[300px] mt-5">
              Christspiracy shows are free for viewers around the world, and we
              intend to keep it that way. But it takes millions of dollars to
              produce high-quality content. That’s where you come in. Here are a
              few reasons why you play a critical role.
            </p>

            {payFwddata.map((item, index) => {
              return (
                <>
                  <div
                    key={index}
                    className="bg-[#D9D9D9] w-[300px] p-10 rounded-md mt-10 text-[#000]"
                  >
                    <h3 className="text-3xl mb-5 font-bold">{item.amount}</h3>
                    <p className="text-2xl mb-3">
                      {item.personsPaidFor} People Can Watch The Chosen Free
                    </p>
                    <h4 className="text-xl mb-3">PERKS</h4>
                    <div>
                      <div className="flex items-center gap-3 mb-5">
                        <FaCheckCircle size={20} color="#46BF44" />
                        <span className="text-lg">
                          Help create future seasons
                        </span>
                      </div>
                      <div className="flex items-cente gap-3 mb-5">
                        <FaCheckCircle size={20} color="#46BF44" />
                        <span className="text-lg">
                          Translate into new languages
                        </span>
                      </div>
                      <div className="flex items-cente gap-3 mb-5">
                        <FaCheckCircle size={20} color="#46BF44" />
                        <span className="text-lg">Pay it forward</span>
                      </div>
                    </div>
                    <h6 className="text-2xl mt-8 font-normal">CONTRIBUTIONS</h6>

                    <div className="flex gap-10 mt-5">
                      <AppBtn
                        className="border-[#EB440F] hover:bg-[#EBEBEB] mt-2 text-[12px] text-center items-center justify-center  w-full  text-[#black] py-3 p-3 px-5 rounded-[12px] "
                        onClick={()=>{
                          processPTF('subscription', parseInt((item.amount).replace("$", "")), item.processingPpl );
                        }}
                        title="Monthly"
                      />
                      <AppBtn
                        className="border-[#EB440F] hover:bg-[#EBEBEB] mt-2 text-[12px] text-center items-center justify-center  w-full  text-[#black] py-3 p-3 px-5 rounded-[12px] "
                        onClick={()=>{
                          processPTF('payment', parseInt((item.amount).replace("$", "")), item.processingPpl );
                        }}
                        title="One Time"
                      />
                    </div>
                  </div>
                </>
              );
            })}
          </div>

          {/* <div className=" -z-10 ">
            <img
              src={fwdImg}
              alt=""
              style={{ height: 700 }}
              className=" max-w-4xl relative -top-40 bottom-0 right-[5%]"
            />
          </div> */}
        </div>
      </div>

      <div id="mobile-payitforward">
        {/* .. */}
        <div className="mt-[40px] px-28">
          <div className="flex flex-col">
            <div className="flex items-center">
              <h3 className="text-[#ffff] text-[30px] mr-5">JOIN US</h3>
              <img src={question} alt="" className="w-[30px] h-[30px]" />
            </div>

            <span className="text-[#ffff]">I want to bring the show to:</span>
            <ReactSlider
              min={100}
              max={100000}
              value={numberOfPpl}
              defaultValue={numberOfPpl}
              className="horizontal-slider"
              thumbClassName="example-thumb"
              trackClassName="example-track"
              onChange={(val) => setNumberOfPpl(val)}
            />
          </div>

          <div className="flex items-center mt-28 mb-16">
            <FaCheckCircle color="#fff" size={20} />
            <span className="text-[#ffff] text-5xl ml-5 inline-block">
              Help create future seasons
            </span>
            g
          </div>
          <div className="flex items-center  mb-16">
            <FaCheckCircle color="#fff" size={20} />
            <span className="text-[#ffff] text-5xl ml-5 inline-block">
              Pay it forward{" "}
            </span>
          </div>
          <div className="flex items-center  mb-16">
            <FaCheckCircle color="#fff" size={20} />
            <span className="text-[#ffff] text-5xl ml-5 inline-block">
              Translate into new languages
            </span>
          </div>
          <div className="flex items-center  mb-16">
            <FaCheckCircle color="#fff" size={20} />
            <span className="text-[#ffff] text-5xl ml-5 inline-block">
              Name in season 4 credits
            </span>
          </div>
          <div className="flex items-center  mb-16">
            <FaCheckCircle color="#fff" size={20} />
            <span className="text-[#ffff] text-5xl ml-5 inline-block">
              One-day set visit for two people
            </span>
          </div>

          <div className="flex flex-col mt-10">
            <AppBtn
              onClick={() => processPTF("subscription")}
              title={`PAY $${
                ((rate?.usd || 1) * numberOfPpl) / (rate?.numberOfPeople || 1)
              } MONTHLY`}
              className="text-[#fff] text-[20px] bg-[#EB440F] font-medium p-3 px-4 rounded-[20px]"
            />
            <AppBtn
              onClick={() => processPTF("payment")}
              title={`ONE TIME PAYMENT OF $${
                ((rate?.usd || 1) * numberOfPpl) / (rate?.numberOfPeople || 1)
              }`}
              className="text-[#fff] text-[18px] p-4 px-4 rounded-[20px] border-2 mt-5 border-[#EB440F]"
            />

            <div className="flex flex-col items-center justify-center mt-5 w-full">
              <p className="text-[12px] w-[200px] text-[#fff] text-center font-normal">
                This would help Christspiracy to reach a 1000 more people
              </p>

              <p className="text-[#fff] mt-5 font-medium ">
                Over 400 people have “paid it forward” globally
              </p>
            </div>
          </div>
        </div>
        {/* ... */}
      </div>
    </>
  );
};

export default PayFwd;
