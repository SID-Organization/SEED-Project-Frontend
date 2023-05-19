import "regenerator-runtime/runtime";
import React, { useContext, useEffect } from "react";
import SpeechRecognitionContext from "../../service/Voice-speech-Service/SpeechRecognitionContext.jsx";

export default function SpeechRecognitionText(props) {
  const { transcript, handleStart, listening } = useContext(SpeechRecognitionContext);

  useEffect(() => {
    if (transcript !== undefined) {
      props.setTexto(transcript);
    }

    if (listening) {
      props.setMicOn(true);
    } else {
      props.setMicOn(false);
    }
  }, [transcript]);

  return (
    <div>
      <button onClick={handleStart}>🎤</button>
    </div>
  );


}