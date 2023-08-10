import React, { useEffect } from "react";
import Carousel from "../../components/Carousel/Carousel";
import GeneralCarousel from "../../components/GeneralCarousel/GeneralCarousel";
import ModeSelector from "../../components/ModeSelector/ModeSelector";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProfileAction } from "../../redux/actions/genericAction";

const Home = () => {
  const { allCollectionData, hasPaidBefore } = useSelector(
    (state) => state.genericSlice
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfileAction());
  }, []);

  return (
    <div className="pt-0">
      {/* <ModeSelector theme='light' /> */}
      <Carousel data={allCollectionData?.allCollections} />
      <GeneralCarousel
        data={allCollectionData?.randomTestimonials}
        title="Trailers and Testimonials"
      />
      <p id="behind-the-scene"></p>
      <GeneralCarousel
        data={allCollectionData?.randomBehindTheScene}
        title="Extended Interviews"
      />
      <div className="mb-20">
        <GeneralCarousel
          isLocked={!hasPaidBefore}
          data={allCollectionData?.randomExtendedInterview}
          title="Behind-the-scenes"
        />
      </div>
    </div>
  );
};

export default Home;
