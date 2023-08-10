import React from "react";
import "./carousel.css";
// import styles from "./carousel.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaArrowLeft, FaArrowRight, FaPlayCircle } from "react-icons/fa";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectCoverflow, Pagination, Navigation } from "swiper";
import play from "../../assets/images/play.png";
import slide_image_2 from "../../assets/images/carousel-images/img_2.jpg";
import slide_image_3 from "../../assets/images/carousel-images/img_3.jpg";
import slide_image_4 from "../../assets/images/carousel-images/img_4.jpg";
import slide_image_5 from "../../assets/images/carousel-images/img_5.jpg";
import slide_image_6 from "../../assets/images/carousel-images/img_6.jpg";
import slide_image_7 from "../../assets/images/carousel-images/img_7.jpg";
import videos from "../../constants/videos";
import { Link, useNavigate } from "react-router-dom";
import { encode, decode } from "string-encode-decode";
import FBtnShare from "../../assets/resource/share.png";
import FBtnPTF from "../../assets/resource/ptf.png";

const Carousel = ({ data = null }) => {
  const navigate = useNavigate();

  if (data == null) {
    return <></>;
  }

  const item = data[0];
  return (
    <div className="px-10 mt-0" style={{ paddingTop: 0 }}>
      <div style={{ height: 400, position: "relative" }}>
        <img
          src={item.coverImage}
          alt="slide_image"
          // width={100}
          // height={100}
          className="object-cover"
        />
        <div
          style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
          className="absolute flex flex-col bg-overlay justify-center items-center top-0 left-0 right-0 w-full h-[100%]"
        >
          <div className="main-cover-class">
            <div
              onClick={() => {
                // console.log( encode(`${item.id}`) );
                console.log(btoa(`${item.collectionId}`), item.collectionId);
                navigate(`/watch/${btoa(`${item.collectionId}`)}`);
              }}
              className="text-[#fff] cursor-pointer items-center justify-center flex flex-col bg-[#EB440F] p-5 rounded-[20px]"
            >
              <div className="flex flex-row items-center">
                <FaPlayCircle size={25} />
                <span className="ml-3 text-[22px] font-bold">Watch</span>
              </div>
              <span className="mt-3 text-[13px]">{item.name}</span>
            </div>

            <div>
              <h4 className="text-3xl font-bold text-[#fff] mt-[15px]">
                Help Us Reach 100 Million Views
              </h4>
              <br />
              <br />
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  src={FBtnShare}
                  className="floating-btn w-20 h-20 cursor-pointer"
                />
                <img
                  src={FBtnPTF}
                  className="floating-btn w-20 h-20 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ el: ".swiper-pagination", clickable: true, bulletActiveClass: "swiper-pagination-bullet-active", bulletClass: "swiper-pagination-bullet swiper-pagination-bullet-inactive",  }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper_container"
      >
        {data.map((item, index) => (
          <SwiperSlide onClick={() => {
            // console.log( encode(`${item.id}`) );
            navigate(`/video/${btoa(`${item.id}`)}`)
          }}>
            <img
              src={item.coverImage}
              alt="slide_image"
              width={100}
              height={100}
              className="object-cover"
            />
            <div className="absolute flex flex-col bg-overlay justify-center items-center top-0 left-0 right-0 w-full h-[100%]">
              <div className="custom-text  items-center justify-center flex flex-col bg-[#EB440F] p-5 rounded-[20px]">
                <div className="flex flex-row items-center">
                  <FaPlayCircle size={25} />
                  <span className="ml-3 text-[15px] font-bold">Watch</span>
                </div>
                <span className="mt-3">
                  {item.name}
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            <ion-icon name="arrow-back-outline"></ion-icon>
          </div>
          <div className="swiper-button-next slider-arrow">
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </Swiper> */}
    </div>
  );
};

export default Carousel;
