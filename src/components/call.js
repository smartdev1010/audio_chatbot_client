import { useState, useEffect } from "react";

const Call = () => {
  const [startTime, setStartTime] = useState(0);
  const [call, setCall] = useState(0);
  const [currentInterval, setCurrentInterval] = useState(-1);
  const [timestamp, setTimestamp] = useState(Date.now());

  const startCall = () => {
    const current = Date.now();
    setStartTime(current);
    setCall(1);
  };

  const endCall = () => {
    setCurrentInterval(-1);
    setCall(0);
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimestamp(Date.now());
    }, 20);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <div className="flex-1 mx-5">
      <input
        type="text"
        name="title"
        id="title"
        placeholder="Your First Name"
        className="w-full text-sm border-gray-300 rounded-md border p-3 my-3"
      />
      <select
        name="owner"
        id="owner"
        className="w-full text-sm border-gray-300 rounded-md border p-3 my-3"
      >
        <option>Customer Title</option>
      </select>
      <select
        name="owner"
        id="owner"
        className="w-full text-sm border-gray-300 rounded-md border p-3 my-3"
      >
        <option>Customer Industry</option>
      </select>
      <select
        name="owner"
        id="owner"
        className="w-full text-sm border-gray-300 rounded-md border p-3 my-3"
      >
        <option>Company Size</option>
      </select>

      <button
        className="flex px-4 py-3 text-sm font-semibold leading-4 transition-colors duration-300 bg-blue-600 rounded-md hover:bg-blue-700 text-blue-50 w-full my-3"
        onClick={() => startCall()}
      >
        <span className="text-center w-full">Begin Call</span>
      </button>

      <button
        className="flex px-4 py-3 text-sm font-semibold leading-4 transition-colors duration-300 bg-blue-600 rounded-md hover:bg-blue-700 text-blue-50 w-full my-3"
        onClick={() => endCall()}
      >
        <span className="text-center w-full">End Call</span>
      </button>

      <div className="w-full py-3 text-center">
        {call && parseInt((timestamp - startTime) / 1000)}s{" "}
        {call && (timestamp - startTime) % 1000}
      </div>
    </div>
  );
};

export default Call;
