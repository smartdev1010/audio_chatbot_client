import logo from "./logo.svg";
import "./App.css";
import Call from "./components/call";
import Avatar from "./components/avatar";
import Output from "./components/output";
import Camera from "./components/camera";
import Recording from "./components/recording";
import { useState } from "react";

function App() {
  const [history, setHistory] = useState([]);

  return (
    <div className="flex pt-20 px-10">
      <Call className="w-1/4" />
      <div className="w-3/4">
        <Recording history={history} setHistory={setHistory} />
        <div className="w-full flex mb-5">
          <Camera />
          <Avatar />
        </div>
        <Output history={history} />
      </div>
    </div>
  );
}

export default App;
