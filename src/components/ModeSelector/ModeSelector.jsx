import React, { useEffect, useState } from "react";
import "./ModeSelector.css";
import { useNavigate } from "react-router-dom";

const modes = ["MOVIES", "EXTRAS"];
export default function ModeSelector({
  // mode = "MOVIES",
  // setMode = (e)=>{},
  theme = "light",
}) {
  const [mode, setMode] = useState("MOVIES");
  const navigate = useNavigate();
  useEffect(() => {
    if (mode == "EXTRAS") {
      navigate("/extras");
    } else if (mode == "LIVESTREAMS") {
    }
  }, [mode]);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        paddingTop: 20,
        paddingBottom: 20,
      }}
    >
      {/* {modes.map((item) => (
        <div
          id="mode-selector"
          style={{
            color: theme == "light" ? "white" : "black",
            marginRight: 15,
            fontWeight: "800",
            borderBottomWidth: 4,
            borderBottomColor:
              mode === item
                ? theme == "light"
                  ? "#E93C24"
                  : "#E93C24"
                : "transparent",
            cursor: "pointer",
          }}
          onClick={() => setMode(item)}
        >
          {item}
        </div>
      ))} */}
    </div>
  );
}
