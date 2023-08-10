import React from "react";
import "./CarouselVideoDetails.css";
import {
  BiSolidSkipNextCircle,
  BiSolidSkipPreviousCircle,
} from "react-icons/bi";
import { BsPauseCircle } from "react-icons/bs";

function Controls() {
  return (
    <div className="mid__container">
      <div className="icon__btn">
        <BiSolidSkipNextCircle />
      </div>

      <div className="icon__btn">
        <BsPauseCircle />
      </div>

      <div className="icon__btn">
        <BiSolidSkipPreviousCircle />
      </div>
    </div>
  );
}

export default Controls;
