import React, { useState } from "react";
import Webcam from "react-webcam";
import { useSelector, useDispatch } from "react-redux";

const WebcamComponent = () => <Webcam />;
const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: "user",
};
const Camera = () => {
  const [picture, setPicture] = useState("");
  const webcamRef = React.useRef(null);
  const isCall = useSelector((state) => state.history.isCall);
  return (
    <div className="w-1/2 flex justify-center items-center">
      <div>
        <div>
          {isCall == 1 ? (
            <Webcam
              audio={false}
              height={400}
              ref={webcamRef}
              width={400}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              className="rounded-md"
            />
          ) : (
            <h1>
              <img className="w-[400px] h-[400px]" src="noCamera.png" />
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};
export default Camera;
