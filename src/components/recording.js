import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useSelector, useDispatch } from "react-redux";
import { addHistory, setUrl } from "../historySlice";
import { talkStream } from "../streaming-client-api";

const Recording = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const history = useSelector((state) => state.history.history);
  const isCall = useSelector((state) => state.history.isCall);
  const settings = useSelector((state) => state.history.settings);
  const dispatch = useDispatch();
  const [isrecording, setIsRecording] = useState(false);
  useEffect(() => {
    SpeechRecognition.startListening({ continuous: false });
    SpeechRecognition.stopListening();
  }, []);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const changeState = async () => {
    if (!isCall) {
      alert("Call is not started yet!!!");
      return;
    } else {
      if (!isrecording) {
        SpeechRecognition.startListening({ continuous: true });
        setIsRecording(true);
        dispatch(setUrl({ url: "" }));
      } else {
        setIsRecording(false);
        SpeechRecognition.stopListening();
        let formData = new FormData();
        // formData.append("prompt", transcript);
        formData.append("prompt", transcript);
        formData.append("user", settings.user);
        formData.append("industry", settings.industry);
        formData.append("c_size", settings.size);
        formData.append("c_title", settings.customer);
        formData.append("type", 0);
        formData.append("history", JSON.stringify(history));

        dispatch(
          addHistory({
            type: "user",
            value: transcript,
          })
        );

        let response = await axios.post(
          "http://localhost:5000/chat2",
          formData
        );
        const msg = new SpeechSynthesisUtterance();
        msg.text = response.data.answer;

        await talkStream(msg.text);

        // window.speechSynthesis.speak(msg);
        dispatch(addHistory({ type: "bot", value: msg.text }));

        resetTranscript();
      }
    }
  };

  return (
    <div>
      <button
        className="flex px-4 py-3 text-sm font-semibold leading-4 transition-colors duration-300 bg-blue-600 rounded-md hover:bg-blue-700 text-blue-50 w-full my-3"
        onClick={() => changeState()}
      >
        <span className="text-center w-full">
          {isrecording ? "Stop" : "Start"}
        </span>
      </button>
      <p>{transcript}</p>
    </div>
  );
};
export default Recording;
