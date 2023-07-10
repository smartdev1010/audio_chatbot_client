import React from "react";
import { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const Recording = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const [isrecording, setIsRecording] = useState(0);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const changeState = () => {
    if (!isrecording) SpeechRecognition.startListening();
    else SpeechRecognition.stopListening();
    setIsRecording(!isrecording);
  };

  return (
    <div>
      <p>Microphone: {listening ? "on" : "off"}</p>
      <button
        className="flex px-4 py-3 text-sm font-semibold leading-4 transition-colors duration-300 bg-blue-600 rounded-md hover:bg-blue-700 text-blue-50 w-full my-3"
        onClick={() => changeState()}
      >
        <span className="text-center w-full">
          {isrecording ? "Stop" : "Start"}
        </span>
      </button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
    </div>
  );
};
export default Recording;
