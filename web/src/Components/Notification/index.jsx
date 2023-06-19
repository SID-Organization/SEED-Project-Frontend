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
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 30);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleReturn = () => {
    return (
      <>
        <div>{props.message}</div>
        <div>
          <LinearProgress variant="determinate" value={progress} />{" "}
        </div>
      </>
    );
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical, horizontal }}
    >
      <SnackbarContent
        style={{
          backgroundColor: "#FFF",
          color: "#023A67",
          fontWeight: "bold",
          position: "relative",
          overflow: "hidden",
        }}
        message={handleReturn()}
      ></SnackbarContent>
    </Snackbar>
  );
}
