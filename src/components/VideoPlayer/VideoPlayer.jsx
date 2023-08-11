import React, { useEffect, useRef, useState } from "react";
import Slider from "@mui/material/Slider";
import screenfull from "screenfull";
import charity from "../../assets/images/charity.png";
import line from "../../assets/images/line.png";
import share from "../../assets/images/share.png";
import playVideo from "../../assets/images/playVideo.png";
import "./VideoPlayer.css";
import ReactPlayer from "react-player";
import vid from "../../assets/videos/test.mp4";
import {
  BsChevronDown,
  BsFillChatLeftTextFill,
  BsPlayCircleFill,
} from "react-icons/bs";
import PlayerControl from "./PlayerControl";
import { formatTime } from "../../utils/format";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getToken, setIdForCollection, setIdForPTF } from "../../redux/storage";
import Loader from "../Loader/Loader";
import axiosClient from "../../api/axios";
import Swal from "sweetalert2";
import SingleThankYou from "../SingleThankYou/SingleThankYou";
import send from "../../assets/images/send.png";
import { getSavedFireStore } from "../../functions/firebase";
import {
  collection,
  query,
  orderBy,
  doc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import useLegends from "react-subtitles";
import axios from "axios";
import { APP_CONFIG } from "../../config/settings";
import PTFCover from "./PTFCover";
import { encode, decode } from "string-encode-decode";
import ThankYouModal from "./ThankYouModal";
import RequestPopUp from "./RequestPopUp";
import Advert from "../Advert/Advert";
import GeneralCarousel from "../GeneralCarousel/GeneralCarousel";

function VideoPlayer() {
  const [openRequest, setOpenRequest] = useState(false);
  const handleOpenRequest = () => setOpenRequest(true);
  const handleCloseRequest = () => setOpenRequest(false);
  const [selected, setSelected] = useState(0);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();
  let { id } = useParams();
  // id = decode(id);
  id = atob(id);
  // console.log(id)
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPayItForwardCover, setshowPayItForwardCover] = useState(false);
  const [showPayItForwardCoverName, setshowPayItForwardCoverName] =
    useState("Kip and Kam");
  const [showPayItForwardCoverObject, setshowPayItForwardCoverObject] =
    useState(null);
  const [showThankYouNoteModal, setshowThankYouNoteModal] = useState(false);
  const [showRequestPopUpModal, setshowRequestPopUpModal] = useState(false);
  const [url, setUrl] = useState(null);
  const [urlShowing, setUrlShowing] = useState(null);
  const [urlNormal, setUrlNormal] = useState(null);
  const [urlFourK, setUrlFourK] = useState(null);
  const [subtitle, setSubtitle] = useState(
    "https://storage.googleapis.com/xspiracy-testing.appspot.com/subtitle%2F1688475963320.vtt"
  );
  const [watchingNow, setWatchingNow] = useState(0);

  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [commentListHeatMap, setCommentListHeatMap] = useState([]);
  const [heatMapValue, setHeatMapValue] = useState(0.5);
  const [isLogging, setisLogging] = useState(false);
  const { allCollectionData, hasPaidBefore } = useSelector(
    (state) => state.genericSlice
  );
  const isLoggedIn = getToken() !== null;
  const [__movieId, __setmovieId] = useState(null);
  const __movieIdRef = useRef(0);
  const [nextPreviosObject, setNextPreviosObject] = useState({
    loaded: false,
    next: false,
    previous: false,
    currentIndex: 0,
  });

  const [videoState, setVideoState] = useState({
    playing: true,
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

  useEffect(() => {
    setIdForCollection(id);

    if (allCollectionData.allCollections == undefined) {
      return;
    }

    // let _data = (allCollectionData?.allCollections).find((v) => v.id == id);
    let _data = (allCollectionData?.allCollections).find(
      (v) => v.collectionId == id
    );
    setData(_data);
  }, []);

  const fetchVideoUrl = async (_id = undefined) => {
    setLoading(true);
    const movieId =
      _id || data?.streamLog?.movieId || data?.contents[0]?.id || 1;
    console.log("movieId", movieId);
    __setmovieId(movieId);
    __movieIdRef.current = movieId;
    setIdForPTF(movieId);

    try {
      const { data } = await axiosClient().get(
        `movie/request-url?movie_id=${movieId}`
      );

      setUrl(data.payload.url);
      setUrlShowing(data.payload.url);
      setUrlNormal(data.payload?.url);
      setUrlFourK(data.payload?.urlFourK);
      setSubtitle(data?.payload?.subtitle || "");
    } catch (error) {
      console.log(error, error?.response?.data);
      // check if it's because
      const msg = error?.response?.data?.message;

      if (msg == "Movie not found") {
        new Swal("Oops...", msg, "error");
        return;
      } else if (msg == "Movie Free Access Finished, Please pay it forward") {
        new Swal("Oops...", "Video Free Access Exceeded", "error");

        setTimeout(() => {
          // let val = confirm("Do you want to pay it forward");
          // if (val == true) {
          //   navigate("/payFwd");
          // }
        }, 2000);
      } else {
        new Swal("Oops...", error.message, "error");
      }

      //
      // Swal.fire({
      //   template: '#my-template'
      // })
    }

    setLoading(false);
  };

  // fetch watching now
  useEffect(() => {
    (async () => {
      await axiosClient().post("watching/add", {
        collectionId: id,
      });

      const { data } = await axiosClient().get(`watching?collectionId=${id}`);
      setWatchingNow(data?.payload?.data?.count || 0);
    })();

    return () => {
      axiosClient().post("watching/subtract", {
        collectionId: id,
      });
    };
  }, []);

  useEffect(() => {
    if (data == null || data == undefined) {
      return;
    }

    fetchVideoUrl();
  }, [data]);

  // log video last activity to server
  const logLastTimeStamp = async (__movieId = null, time = null) => {
    try {
      const videoCurrentTime = playerRef.current.getCurrentTime();
      // alert('logging last movie stamp'+videoCurrentTime)

      await axiosClient().post("movie/log-last-stream", {
        collectionId: `${id}`,
        movieId: `${__movieId != null ? __movieId : __movieIdRef.current}`,
        trackStamp: `${time != null ? time : videoCurrentTime}`,
      });
    } catch (error) {}

    setTimeout(() => {
      logLastTimeStamp();
    }, 120000);
  };
  useEffect(() => {
    if (isLoggedIn && !isLogging) {
      setTimeout(() => {
        logLastTimeStamp();
      }, 9000);
      setisLogging(true);
    }

    return () => {
      if (isLoggedIn) {
        logLastTimeStamp();
      }
    };
  }, []);

  // check if already logged data exist n fetch
  useEffect(() => {
    try {
      if (__movieId != null) {
        console.log(data?.streamLog, "data?.streamLog");
        let lastTimeWatched = data?.streamLog?.trackStamp || 0;
        // alert('seekTo' + lastTimeWatched);
        if (data?.streamLog?.movieId == __movieId) {
          playerRef.current.seekTo(lastTimeWatched);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [__movieId, allCollectionData]);

  // check for next n previous
  useEffect(() => {
    if (__movieId == null) {
      return;
    }

    let totalLength = data?.contents.length;
    let currentIndex = data?.contents.findIndex((v) => v.id == __movieId);

    if (currentIndex == null) {
      return;
    }

    setNextPreviosObject({
      loaded: true,
      next: currentIndex != totalLength,
      previous: currentIndex != 0,
      currentIndex,
    });
  }, __movieId);

  const nextVideo = async () => {
    try {
      setLoading(true);
      const tmp = data.contents[nextPreviosObject.currentIndex + 1];
      await logLastTimeStamp(tmp.id);
      // await fetchVideoUrl(tmp.id);
      window.location.reload();
    } catch (error) {}
    setLoading(false);
  };
  const previousVideo = async () => {
    try {
      setLoading(true);
      const tmp = data.contents[nextPreviosObject.currentIndex - 1];
      await logLastTimeStamp(tmp.id, 1);
      // await fetchVideoUrl(tmp.id);
      window.location.reload();
    } catch (error) {}
    setLoading(false);
  };

  const sendComment = async () => {
    if (comment.length == 0) {
      return;
    }
    const videoCurrentTime = playerRef.current.getCurrentTime();

    const payload = {
      collectionId: id,
      movieId: `${__movieId}`,
      trackStamp: `${videoCurrentTime}`,
      comment: comment,
    };
    setComment("");

    await axiosClient().post("movie/comment", payload);
  };

  // listen for comment
  useEffect(() => {
    if (__movieId == null) {
      return;
    }

    (async () => {
      const db = getSavedFireStore();
      // const commentRef = collection(db, "comments");
      const usersRaw = await getDocs(collection(db, "users"));
      const users = [];
      usersRaw.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        users.push(doc.data());
      });

      // console.log(users, "users");
      const collRef = collection(
        db,
        "comments",
        `collection-${id}-movie-${__movieId}`,
        "contents"
      );
      const q = query(collRef, orderBy("dateCommented"));
      onSnapshot(q, (docs) => {
        let tmp = [];
        docs.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          let comment = doc.data();

          tmp.push({
            ...comment,
            user: users.find((v) => v.id == comment.userId),
          });
        });

        console.log(tmp, "tmp");
        setCommentList(tmp);
      });
    })();
  }, []);

  useEffect(() => {
    try {
      const totalComment = commentList.length;
      const currentLocation = playerRef.current.getCurrentTime();
      const commentOnLocationData = commentList.filter((a) => {
        // console.log((Math.abs(parseInt(a.trackStamp) - parseInt(currentLocation)) ), parseInt(a.trackStamp), parseInt(currentLocation))
        return (
          Math.abs(parseInt(a.trackStamp) - parseInt(currentLocation)) < 30
        );
      });
      const commentOnLocation = commentOnLocationData.length;
      setCommentListHeatMap(commentOnLocationData);

      const newVal = commentOnLocation / totalComment;
      if (newVal == NaN) {
        return;
      }
      setHeatMapValue(newVal);

      // console.log((commentOnLocation / totalComment), commentOnLocation, totalComment)
    } catch (error) {}
    // console.log('looper reached')
  });

  useEffect(() => {
    if (url != null) {
      getPTFNames();
      // setTimeout(()=>{

      // }, 3000)
    }
  }, [url]);

  const getPTFNames = async () => {
    const { data } = await axiosClient().get("pay/users");
    console.log(data);

    if (data.payload.hasPaidBefore == false) {
      const nameList = data.payload.nameListObject;
      const _object = nameList[parseInt(Math.random() * nameList.length)];
      setshowPayItForwardCoverName(_object.name);
      setshowPayItForwardCoverObject(_object);
      setshowPayItForwardCover(true);

      setTimeout(() => {
        // to hide the pay it foward modal after a specific time
        setshowPayItForwardCover(false);
      }, 10000);
    } else {
      if (url != urlFourK) {
        if (urlFourK.length > 2) {
          setUrl(urlFourK);
          setUrlShowing(urlFourK);
        }
      }
    }
  };

  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
  };

  // let v = null;
  // try{
  //   let time = playerRef?.current?.getCurrentTime() || 0;
  //   const [subtitleText] = useLegends({
  //     // subtitles: subtitle,
  //     subtitles: './test.vtt',
  //     videoTime: time,
  //   })
  //   v = subtitleText;
  //   // console.log(subtitleText, time, subtitle)
  // }catch(e){}
  // console.log(heatMapValue, subtitle);

  // useEffect(()=>{
  //   if(subtitle != null){
  //     (async()=>{

  //       const _subtitle = await fetch(APP_CONFIG.BASE_URL+'proxy?url='+subtitle, {
  //         mode: 'cors',
  //         // url: 'https://storage.googleapis.com/xspiracy-testing.appspot.com/subtitle%2F1688477849199.vtt',
  //         // url: subtitle,
  //         headers: {
  //           origin: '*'
  //         }
  //       });

  //       console.log(await _subtitle.text(), "subtitle_data", subtitle);

  //     })()
  //   }
  // }, [subtitle])

  if (data == null || data == undefined) {
    return;
  }

  return (
    <>
      {loading && <Loader />}
      <div ref={playerContainerRef} className="w-full h-[50%] videoWrapper">
        <ReactPlayer
          ref={playerRef}
          url={urlShowing}
          muted={muted}
          width="100%"
          height={window.screen.availHeight * 0.5}
          playing={playing}
          volume={volume}
          onProgress={progressHandler}
          config={{
            file: {
              attributes: {
                // crossOrigin: 'anonymous',
                crossOrigin: "no-cors",
                // crossOrigin: 'true',
              },
              tracks: [
                {
                  kind: "subtitles",
                  src: APP_CONFIG.BASE_URL + "proxy?url=" + subtitle,
                  srcLang: "en",
                  default: true,
                },
              ],
            },
          }}
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
          urlNormal={urlNormal}
          urlFourK={urlFourK}
          url={urlShowing}
          setUrl={setUrlShowing}
        />

        <PTFCover
          name={showPayItForwardCoverName}
          _object={showPayItForwardCoverObject}
          url={urlShowing}
          onPlayPause={handlePlayPause}
          playing={playing}
          handleOpen={handleOpen}
          setshowThankYouNoteModal={setshowThankYouNoteModal}
          currentTime={playerRef?.current?.getCurrentTime() || null}
          setshowPayItForwardCover={setshowPayItForwardCover}
          showPayItForwardCover={showPayItForwardCover}
        />
      </div>

      {/* <ReactPlayer
          url={['https://iandevlin.github.io/mdn/video-player-with-captions/video/sintel-short.mp4']}
          className='react-player'
          controls={true}
          playing={true}
          width={'100%'}
          height={500}
          config={{ file: {
            attributes: {
	            crossOrigin: 'true',
              // crossOrigin: 'anonymous',
            },
            tracks: [
              {kind: 'subtitles', src: 'https://iandevlin.github.io/mdn/video-player-with-captions/subtitles/vtt/sintel-en.vtt', srcLang: 'en', default: true}
            ]
          }}}
        /> */}

      <div className="pn">
        <div>
          {nextPreviosObject.previous && (
            <div onClick={() => previousVideo()} className="btn-pn">
              &#8592; previous
            </div>
          )}
        </div>
        <div>
          {nextPreviosObject.next && (
            <div onClick={() => nextVideo()} className="btn-pn">
              next &#8594;
            </div>
          )}
        </div>
      </div>

      <div className="md:flex justify-between hidden  items-cente px-20 mt-5">
        <div
          className="flex items-center text-[14px] cursor-pointer"
          // onClick={() => navigate("/comment")}
        >
          <BsFillChatLeftTextFill color="#fff" size={20} />
          <span className="text-[#fff] ml-5"> {commentList.length} </span>
        </div>

        <div className="text-[#fff] flex items-center text-lg ml-10">
          <div className="flex flex-col">
            <span>WATCHING NOW</span>
            <img src={line} alt="" />
          </div>

          <div className="w-[38px] h-[20px] bg-[#DEE5D3] p-3 flex items-center justify-center rounded-xl ml-5 text-[#000]">
            <span>{watchingNow || 0}</span>
          </div>
        </div>

        {/* <div className="text-[#fff] text-[14px] mx-8">ABOUT</div> */}

        <div
          className="text-[#fff] ml-3 text-lg cursor-pointer mt-5"
          onClick={() => navigate("/extended-review")}
        >
          EXTENDED INTERVIEW
        </div>

        <div className="flex items-center mr-3">
          <img src={share} alt="" className="w-[30px] h-[30px]" />
          <span className="text-[#fff] inline-block ml-3 text-[12px]">
            Share
          </span>
        </div>

        <div className="flex items-center w-[200px] text-[#fff] ml-8">
          <span id="hide-small-text-1" className="text-sm">
            Pay it forward to help create future films and further impact.
          </span>
        </div>

        <div
          className="flex items-center  w-[160px] justify-center text-center rounded-[12px] ml-5 p-5 cursor-pointer"
          style={{ backgroundColor: "rgba(233, 60, 36, 1)" }}
          onClick={() => navigate("/payFwd")}
        >
          <span className="text-[#fff] text-3xl">Pay it Forward</span>
        </div>

        {heatMapValue > 0.1 && (
          <div className="flex items-center ml-10">
            <span className="text-[#EB440F] mr-5 text-[12px] inline-block ">
              Heatmap
            </span>
            <Slider
              sx={{
                width: 50,
                color:
                  heatMapValue > 0.5
                    ? "rgb(235, 68, 15, " + heatMapValue + ")"
                    : "white",
                marginLeft: "5px",
              }}
              value={heatMapValue * 100}
              min={0}
              max={100}
            />
          </div>
        )}
      </div>

      <div className="w-[100%] md:hidden flex justify-between items-center px-20">
        <div className="flex  text-[14px] cursor-pointer">
          <BsFillChatLeftTextFill color="#fff" size={20} />
          <span className="text-[#fff] ml-5"> {commentList.length} </span>
        </div>

        {heatMapValue > 0.1 && (
          <div className="flex items-center ml-10">
            <span className="text-[#EB440F] mr-5 text-[12px] inline-block ">
              Heatmap
            </span>
            <Slider
              sx={{
                width: 50,
                color:
                  heatMapValue > 0.5
                    ? "rgb(235, 68, 15, " + heatMapValue + ")"
                    : "white",
                marginLeft: "5px",
              }}
              value={heatMapValue * 100}
              min={0}
              max={100}
            />
          </div>
        )}
      </div>

      <div className="w-[100%] md:hidden flex mt-5 justify-between items-center px-10">
        <div className="text-[#fff] flex items-center text-lg">
          <div className="flex flex-col">
            <span className="text-lg">WATCHING NOW</span>
            <img src={line} alt="" />
          </div>

          <div className="w-[38px] h-[20px] bg-[#DEE5D3] p-3 flex items-center justify-center rounded-xl ml-5 text-[#000]">
            <span>{watchingNow || 0}</span>
          </div>
        </div>

        {/* <div className="text-[#fff] text-[14px] mx-8">ABOUT</div> */}

        <div
          className="text-[#fff] ml-3 text-lg cursor-pointer mt-5"
          onClick={() => navigate("/extended-review")}
        >
          EXTENDED INTERVIEW
        </div>
      </div>

      <div className="w-[100%] md:hidden flex  justify-between items-center mt-10 px-10">
        <div className="flex items-center w-[170px] text-[#fff]">
          <span className="text-sm">
            Pay it forward to help create future films and further impact.
          </span>
        </div>

        <div
          className="flex items-center  w-[160px] justify-center text-center rounded-[12px] ml-5 p-5 cursor-pointer"
          style={{ backgroundColor: "rgba(233, 60, 36, 1)" }}
          onClick={() => navigate("/payFwd")}
        >
          <span className="text-[#fff] text-3xl">Pay it Forward</span>
        </div>
      </div>

      <div className="flex px-40 mb-20">
        <template id="my-template">
          <swal-title>Save changes to "Untitled 1" before closing?</swal-title>
          <swal-icon type="warning" color="red"></swal-icon>
          <swal-button type="confirm">Save As</swal-button>
          <swal-button type="cancel">Cancel</swal-button>
          <swal-button type="deny">Close without Saving</swal-button>
          <swal-param name="allowEscapeKey" value="false" />
          <swal-param name="customClass" value='{ "popup": "my-popup" }' />
          <swal-function-param
            name="didOpen"
            value="popup => console.log(popup)"
          />
        </template>
      </div>

      <div className="flex w-full">
        <div
          style={{ display: "flex", flexDirection: "column" }}
          className=" px-20 w-[100%]"
        >
          <h4 className="text-3xl mb-5 text-[#DEE5D3]">Comments</h4>
          <div
            className={`commentContainer ${
              selected === 1 ? "content2 mt-5 show" : "content2"
            } relative w-full bg-[#3C3D3C] pb-10 pl-10 rounded-xl`}
          >
            <BsChevronDown
              className="mr-10 z-50 top-5 absolute  w-[30px] h-[30px] right-5 cursor-pointer"
              color="#fff"
              size={10}
              onClick={() => toggle(1)}
            />
            <div className=" flex flex-col">
              {commentList.reverse().map((item, i) => (
                <SingleThankYou key={i} data={item} className="w-[100%]" />
              ))}
            </div>

            {isLoggedIn ? (
              <div className=" md:w-[60%] w-[90%] mt-6 max-w-3xl items-center border-[#fff] border-[1px] rounded-[15px] h-[40px] bg-[#000] relative flex">
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Leave Comment"
                  className="w-[100%] h-[100%] bg-transparent text-[14px] text-[#fff] px-10 focus:outline-none"
                />
                <img
                  src={send}
                  alt=""
                  onClick={() => sendComment()}
                  className="w-[30px] h-[30px] mr-5 cursor-pointer"
                />
              </div>
            ) : (
              <h3 className="text-[#EB440F] text-lg mt-5">
                Login to have access to make a comment
              </h3>
            )}
          </div>
        </div>

        {/* <div
          style={{ display: "flex", flexDirection: "column", flex: 0.4 }}
          className="mt-[28px]"
        >
          {heatMapValue > 0.1 && (
            <>
              <h4 className="text-3xl" style={{ color: "white" }}>
                HeatMap Comments
              </h4>

              <div className="commentContainer">
                {commentListHeatMap.reverse().map((item, i) => (
                  <SingleThankYou key={i} data={item} className="w-[100%]" />
                ))}
              </div>
            </>
          )}
        </div> */}
      </div>

      <div>
        <GeneralCarousel
          isLocked={!hasPaidBefore}
          data={allCollectionData?.randomExtra}
          title="EXTRA"
        />
      </div>

      <Advert />

      <ThankYouModal
        showPayItForwardCoverObject={showPayItForwardCoverObject}
        setshowThankYouNoteModal={setshowThankYouNoteModal}
        setshowRequestPopUpModal={setshowRequestPopUpModal}
        handleOpenRequest={handleOpenRequest}
        open={open}
        handleClose={handleClose}
        handleOpen={handleOpen}
      />

      {/* const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false); */}

      <RequestPopUp
        showPayItForwardCoverObject={showPayItForwardCoverObject}
        setshowThankYouNoteModal={setshowThankYouNoteModal}
        setshowRequestPopUpModal={setshowRequestPopUpModal}
        openRequest={openRequest}
        setOpenRequest={setOpenRequest}
        handleOpenRequest={handleOpenRequest}
        handleCloseRequest={handleCloseRequest}
      />
    </>
  );
}

export default VideoPlayer;
