import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import { Button, SnackbarContent } from "@mui/material";
import { Link } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";

// Translation
import TranslationJson from "../../API/Translate/components/notification.json";
import TranslateUtils from "../../utils/Translate-Utils/index.js";
import { useContext } from "react";
import { TranslateContext } from "../../contexts/translate/index.jsx";

import Alert from "@mui/material/Alert";

export default function Notification(props) {
  const translate = TranslationJson;
  const [language] = useContext(TranslateContext);

  const [state, setState] = React.useState({
    open: true,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  // Loading animation
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer); // Stop the timer when progress reaches 100%
          return oldProgress;
        }
        return oldProgress + 3; // Increase progress by 20 every 50 milliseconds
      });
    }, 50); // Run every 50 milliseconds

    setTimeout(() => {
      clearInterval(timer);
      setProgress(100); // Set progress to 100 after 5 seconds
    }, 3000); // 5 seconds in milliseconds

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleReturn = () => {
    return (
      <>
        <div>{props.message}</div>
        <div>
          <LinearProgress
            sx={{
              width: "100%",
              borderRadius: "10px",
              position: "absolute",
              bottom: "0",
              left: "0",
            }}
            variant="determinate"
            value={progress}
          />{" "}
        </div>
      </>
    );
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={2000}
      onClose={handleClose}
      anchorOrigin={{ vertical, horizontal }}
    >
      <Alert
        severity={props.severity}
        sx={{ width: "100%" }}
        style={{
          color: "#023A67",
          fontWeight: "bold",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {handleReturn()}
      </Alert>
    </Snackbar>
  );
}
