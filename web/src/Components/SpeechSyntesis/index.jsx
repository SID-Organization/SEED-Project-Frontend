import React, { useState, useEffect } from "react";
import { MdVolumeUp } from "react-icons/md";
import { useSpeechSynthesis } from "react-speech-kit";
import "./TextToVoice.css";

//MUI
import MuiIconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { Tooltip } from "@mui/material";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";

const IconButton = styled(MuiIconButton)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "fixed",
  bottom: "20px",
  right: "-15px",
  width: "50px",
  height: "50px",
  backgroundColor: "#00579D",
  color: "white",
  border: "none",
  borderRadius: "50%",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  cursor: "pointer",

  "&:hover": {
    backgroundColor: "#00579ddb",
  },
}));

export default function TextToVoice() {
  const { speak } = useSpeechSynthesis();
  const [selectedText, setSelectedText] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  useEffect(() => {
    document.addEventListener("mouseup", handleTextSelect);
    return () => {
      document.removeEventListener("mouseup", handleTextSelect);
    };
  }, []);

  const handleTextSelect = () => {
    const text = window.getSelection().toString();
    setSelectedText(text);
    setShowButton(text !== "");
  };

  const handleSpeak = () => {
    const voices = window.speechSynthesis.getVoices();
    console.log(voices);
    const voice = voices.find(
      (voice) => voice.name === "Microsoft Maria - Portuguese (Brazil)"
    );
    speak({ text: selectedText, voice });
    setIsButtonClicked(true);

    setTimeout(() => {
      setIsButtonClicked(false);
    }, 2000);
  };

  return (
    <div className="fixed right-5 top-1/2 z-50 -translate-y-1/2 transform">
      {showButton && (
        <Tooltip
          title={isButtonClicked ? "Lendo texto..." : "Ler texto"}
          placement="left"
        >
          <IconButton onClick={handleSpeak}>
            <p>
              {
                <span className="text-2xl text-white">
                  {isButtonClicked ? (
                    <DoneRoundedIcon />
                  ) : (
                    <VolumeUpRoundedIcon />
                  )}
                </span>
              }
            </p>
          </IconButton>
        </Tooltip>
      )}
    </div>
  );
}
