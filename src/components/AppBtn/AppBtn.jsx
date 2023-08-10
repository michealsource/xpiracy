import React from "react";
import Spinner from "../Spinner/Spinner";

const AppBtn = ({
  showSpinner = false,
  disabled = false,
  onClick,
  title,
  className = "",
  id = "",
  style = {},
}) => {
  return (
    <button
      id={id}
      disabled={disabled}
      className={
        `btn btn-primary flex items-center gap-3
      } ` + className
      }
      style={style}
      onClick={onClick}
    >
      <span> {title}</span>
      {showSpinner && <Spinner />}
    </button>
  );
};

export default AppBtn;
