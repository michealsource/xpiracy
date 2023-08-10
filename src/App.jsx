import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectCoverflow, Pagination, Navigation } from "swiper";
import slide_image_1 from "./assets/images/carousel-images/img_1.jpg";
import slide_image_2 from "./assets/images/carousel-images/img_2.jpg";
import slide_image_3 from "./assets/images/carousel-images/img_3.jpg";
import slide_image_4 from "./assets/images/carousel-images/img_4.jpg";
import slide_image_5 from "./assets/images/carousel-images/img_5.jpg";
import slide_image_6 from "./assets/images/carousel-images/img_6.jpg";
import slide_image_7 from "./assets/images/carousel-images/img_7.jpg";
import Carousel from "./components/Carousel/Carousel";
import DesktopHeader from "./components/DesktopHeader/DesktopHeader";
import GeneralCarousel from "./components/GeneralCarousel/GeneralCarousel";
import Footer from "./components/Footer/Footer";
import {
  BrowserRouter as Router,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import SingleVideoPage from "./pages/SingleVideoPage/SingleVideoPage";
import HelpPage from "./pages/HelpPage/HelpPage";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer";
import WebLayout from "./Layout/WebLayout";

import WelcomePage from "./pages/WelcomePage/WelcomePage";
import PayFwd from "./pages/PayFwd/PayFwd";
import Community from "./pages/Community/Community";
import ViewThankYouPage from "./pages/ViewThankYouPage/ViewThankYouPage";
import Extras from "./pages/Extras/Extras";
import AuthHome from "./pages/AuthenticationPages/AuthHome";
import Login from "./pages/AuthenticationPages/Login";
import Registration from "./pages/AuthenticationPages/Registration";
import ForgotPassword from "./pages/AuthenticationPages/ForgotPassword";
import ThankYouNote from "./pages/ThankYouNote/ThankYouNote";
import AboutPage from "./pages/AboutPage/AboutPage";
import Comment from "./pages/Comment/Comment";
import Help from "./pages/Help/Help";
import ExtendedReviews from "./pages/ExtendedReviews/ExtendedReviews";
import Preview from "./pages/Preview/Preview";
import Loader from "./components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCollectionDataAction,
  getCommunityAction,
  getGenresAction,
  getHasPayItBeforeAction,
  getPlacementAction,
  getProfileAction,
  getRateAction,
} from "./redux/actions/genericAction";
import { getToken } from "./redux/storage";
import SuccessfulPayment from "./pages/Sucess/Payment";
import { getFirebase } from "./functions/firebase";
import ResetPassword from "./pages/AuthenticationPages/ResetPassword";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "./App.css";
import NewLogin from "./pages/AuthenticationPages/NewPage/Login";
import NewRegister from "./pages/AuthenticationPages/NewPage/Register";
import NewForget from "./pages/AuthenticationPages/NewPage/Forget";
import Profile from "./pages/Profile/Profile";
import EditProfile from "./pages/EditProfile/EditProfile";
import Privacy from "./pages/Privacy/Privacy";
import TermsOfUse from "./pages/TermsOfUse/TermsOfUse";
import Facts from "./pages/Facts/Facts";
import CarouselVideoDetails from "./pages/CarouselVideoDetails/CarouselVideoDetails";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const genericSlice = useSelector((state) => state.genericSlice);

  useEffect(() => {
    const __route = window.location.pathname;
    const token = getToken();
    // console.log(token, "getToken()")
    // if((token == null) && (__route != "/login")){
    //   window.location.replace('/login');
    // }else{
    // }
    dispatch(getAllCollectionDataAction());
    dispatch(getRateAction());
    dispatch(getCommunityAction());
    dispatch(getHasPayItBeforeAction());
    dispatch(getProfileAction());
    // dispatch(getGenresAction());
    // dispatch(getPlacementAction());
  }, []);

  useEffect(() => {
    if (genericSlice.allCollectionDataStatus == "loading") {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [genericSlice.allCollectionDataStatus]);

  useEffect(() => {
    getFirebase();
  }, []);
  return (
    <GoogleOAuthProvider clientId="732196846036-6kt19rqd4s2fiiphtad3df0jd89jiau1.apps.googleusercontent.com">
      <Router>
        {loading && <Loader />}
        <Routes>
          <Route path="/authenticate" element={<NewLogin />} />
          <Route path="/register" element={<NewRegister />} />
          <Route path="/forget" element={<NewForget />} />

          <Route path="/" element={<WebLayout />}>
            <Route index element={<Home />} />
            <Route path="/singleVideo" element={<SingleVideoPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/video/:id" element={<Preview />} />
            <Route path="/watch/:id" element={<VideoPlayer />} />
            <Route path="/payFwd" element={<PayFwd />} />
            <Route path="/community" element={<Community />} />
            <Route path="/viewThankYou" element={<ViewThankYouPage />} />
            <Route path="/extras" element={<Extras />} />
            {/* <Route path="/authenticate" element={<AuthHome />} /> */}
            {/* <Route path="/authenticate" element={<NewLogin />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/reset-account-password/:token"
              element={<ResetPassword />}
            />
            <Route path="/thank-you-note" element={<ThankYouNote />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/comment" element={<Comment />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/extended-review" element={<ExtendedReviews />} />
            <Route path="/successful-payment" element={<SuccessfulPayment />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<TermsOfUse />} />
            <Route path="/facts" element={<Facts />} />
            <Route path="/video-details" element={<CarouselVideoDetails />} />
          </Route>
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
