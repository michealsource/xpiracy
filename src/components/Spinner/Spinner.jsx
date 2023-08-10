import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CircularProgress, {
  circularProgressClasses,
} from "@mui/material/CircularProgress";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

// Inspired by the former Facebook spinners.
function FacebookCircularProgress(props) {
  return (
    <Box sx={{ position: "relative" }}>
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: (theme) => (theme.palette.mode === "light" ? "#fff" : "#fff"),
          animationDuration: "550ms",

          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
          },
        }}
        size={20}
        thickness={4}
        {...props}
      />
    </Box>
  );
}

export default function Spinner() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <FacebookCircularProgress />
    </Box>
  );
}
