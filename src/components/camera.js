import React, { useState } from "react";
import Webcam from "react-webcam";
const WebcamComponent = () => <Webcam />;
const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: "user",
};
const Camera = () => {
  const [picture, setPicture] = useState("");
  const webcamRef = React.useRef(null);
  const capture = React.useCallback(() => {
    const pictureSrc = webcamRef.current.getScreenshot();
    setPicture(pictureSrc);
  });
  return (
    <div className="w-1/2 flex justify-center items-center">
      <div>
        <h2 className="mb-5 text-center">My Camera</h2>
        <div>
          {picture == "" ? (
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
            <img src={picture} />
          )}
        </div>
      </div>
    </div>
  );
};
export default Camera;
