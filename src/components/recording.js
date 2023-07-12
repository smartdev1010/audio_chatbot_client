import React from "react";
import { useState } from "react";
import axios from "axios";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useSelector, useDispatch } from "react-redux";
import { addHistory } from "../historySlice";

const Recording = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const history = useSelector((state) => state.history.history);
  const dispatch = useDispatch();
  const [isrecording, setIsRecording] = useState(0);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const changeState = async () => {
    if (!isrecording) SpeechRecognition.startListening();
    else {
      SpeechRecognition.stopListening();
      setIsRecording(!isrecording);
      let formData = new FormData();
      // formData.append("prompt", transcript);
      formData.append("prompt", "Tell me about the history of valleyball.");
      dispatch(
        addHistory({
          type: "user",
          value: "Tell me about the history of valleyball.",
        })
      );

      const response = await axios.post(
        "http://localhost:5000/chat2",
        formData
      );
      const msg = new SpeechSynthesisUtterance();
      msg.text = response.data.answer;

      window.speechSynthesis.speak(msg);
      dispatch(addHistory({ type: "bot", value: response.data.answer }));
    }
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
