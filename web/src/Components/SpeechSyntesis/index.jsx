import React, { useState, useEffect } from 'react';
import { MdVolumeUp } from 'react-icons/md';
import { useSpeechSynthesis } from 'react-speech-kit';
import './TextToVoice.css';

export default function TextToVoice() {
  const { speak } = useSpeechSynthesis();
  const [selectedText, setSelectedText] = useState('');
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    document.addEventListener('mouseup', handleTextSelect);
    return () => {
      document.removeEventListener('mouseup', handleTextSelect);
    };
  }, []);

  const handleTextSelect = () => {
    const text = window.getSelection().toString();
    setSelectedText(text);
    setShowButton(text !== '');
  };

  const handleSpeak = () => {
    speak({ text: selectedText });
  };

  return (
    <div className="text-to-voice-container">
      {showButton && (
        <button className="text-to-voice-button" onClick={handleSpeak}>
          <p className={"volume-icon"}>🔥</p>
        </button>
      )}
    </div>
  );
}
