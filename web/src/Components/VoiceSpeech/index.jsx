import "regenerator-runtime/runtime";
import React, { useContext, useEffect } from "react";
import SpeechRecognitionContext from "../../service/Voice-speech-Service/SpeechRecognitionContext.jsx";

export default function SpeechRecognitionText() {
  const { transcript, resetTranscript, startListening } = useContext(SpeechRecognitionContext);

  let transcriptState;

  useEffect(() => {
    transcriptState = transcript;
    console.log(transcriptState);
  }, [transcript]);

  return (
    <div>
      <button onClick={startListening}>Start</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
    </div>
  );


}