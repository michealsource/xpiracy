import React, { useEffect } from "react";
import DesktopHeader from "../components/DesktopHeader/DesktopHeader";
import Footer from "../components/Footer/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { getToken } from "../redux/storage";

const WebLayout = () => {
  const location = useLocation();
  const SECURE_ROUTE = ["/payFwd", "/thank-you-note"];

  // console.log(location)
  useEffect(() => {
    const __route = window.location.pathname;
    const token = getToken();
    // console.log(token, "getToken()")

    if (token == null && SECURE_ROUTE.includes(__route)) {
      window.location.replace("/authenticate");
    } else {
      // dispatch(statAction());
      // dispatch(getGenresAction());
      // dispatch(getPlacementAction());
      // dispatch(getCollectionAction());
      // dispatch(getAllCollectionDataAction());
      // dispatch(getCommunityAction());
    }
  }, [location]);

  return (
    <div style={{ maxWidth: "1500px", width: "100%" }} className="mx-auto">
      <DesktopHeader />
      <div>{<Outlet />}</div>

      <Footer />
    </div>
  );
};

export default WebLayout;
