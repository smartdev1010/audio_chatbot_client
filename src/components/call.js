import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { startCall, endCall, setSettings, addHistory } from "../historySlice";
import axios from "axios";

const Call = () => {
  const [startTime, setStartTime] = useState(0);
  const [call, setCall] = useState(0);
  const [currentInterval, setCurrentInterval] = useState(-1);
  const [timestamp, setTimestamp] = useState(Date.now());
  const [user, setUser] = useState("");
  const [customer, setCustomer] = useState("");
  const [industry, setIndustry] = useState("");
  const [size, setSize] = useState("");

  const history = useSelector((state) => state.history.isCall);
  const dispatch = useDispatch();

  const callStarted = () => {
    const current = Date.now();
    setStartTime(current);
    setCall(1);
    dispatch(startCall());
    dispatch(
      setSettings({
        user,
        customer,
        industry,
        size,
      })
    );
  };

  const callEnded = async () => {
    setCurrentInterval(-1);
    setCall(0);
    dispatch(endCall());

    let formData = new FormData();
    // formData.append("prompt", transcript);
    formData.append("prompt", "");
    formData.append("user", user);
    formData.append("industry", industry);
    formData.append("c_size", size);
    formData.append("c_title", customer);
    formData.append("type", 1);

    const response = await axios.post("http://localhost:5000/chat2", formData);
    const msg = new SpeechSynthesisUtterance();
    msg.text = response.data.answer;

    window.speechSynthesis.speak(msg);
    dispatch(addHistory({ type: "bot", value: response.data.answer }));
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
        onChange={(e) => setUser(e.target.value)}
      />
      <select
        name="owner"
        id="owner"
        className="w-full text-sm border-gray-300 rounded-md border p-3 my-3"
        onChange={(e) => setCustomer(e.target.value)}
      >
        <option>Customer Title</option>
        <option value="CEO">CEO</option>
        <option value="CFO">CFO</option>
        <option value="COO">COO</option>
        <option value="CRO">CRO</option>
        <option value="CMO">CMO</option>
        <option value="VP of Operations">VP of Operations</option>
        <option value="VP of Finance">VP of Finance</option>
        <option value="VP of Sales">VP of Sales</option>
      </select>
      <select
        name="owner"
        id="owner"
        className="w-full text-sm border-gray-300 rounded-md border p-3 my-3"
        onChange={(e) => setIndustry(e.target.value)}
      >
        <option>Customer Industry</option>
        <option value="E-Commerce">E-Commerce</option>
        <option value="EdTech">EdTech</option>
        <option value="FinTech">FinTech</option>
        <option value="Manufacturing">Manufacturing</option>
        <option value="Telehealth">Telehealth</option>
        <option value="PropTech">PropTech</option>
      </select>
      <select
        name="owner"
        id="owner"
        className="w-full text-sm border-gray-300 rounded-md border p-3 my-3"
        onChange={(e) => setSize(e.target.value)}
      >
        <option>Company Size</option>
        <option value="1-99 Employees">1-99 Employees</option>
        <option value="100-499 employees">100-499 employees</option>
        <option value="500-999 employees">500-999 employees</option>
        <option value="1000-4999 employees">1000-4999 employees</option>
        <option value="5000+ employees">5000+ employees</option>
      </select>

      <button
        className="flex px-4 py-3 text-sm font-semibold leading-4 transition-colors duration-300 bg-blue-600 rounded-md hover:bg-blue-700 text-blue-50 w-full my-3"
        onClick={() => callStarted()}
      >
        <span className="text-center w-full">Begin Call</span>
      </button>

      <button
        className="flex px-4 py-3 text-sm font-semibold leading-4 transition-colors duration-300 bg-blue-600 rounded-md hover:bg-blue-700 text-blue-50 w-full my-3"
        onClick={() => callEnded()}
      >
        <span className="text-center w-full">End Call</span>
      </button>

      <div className="w-full py-3 text-center mb-4 text-lg">
        {call && parseInt((timestamp - startTime) / 1000)}s{" "}
        {call && (timestamp - startTime) % 1000}
      </div>
      <div>
        <h1 className="text-2xl font-bold mb-4 text-center">Instructions</h1>
        <ul>
          <ol className="text-slate-500 text-sm mb-2">
            1. Enter in your name, and information about your customer
          </ol>
          <ol className="text-slate-500 text-sm mb-2">
            2. Click Begin Call Button and enable your camera
          </ol>
          <ol className="text-slate-500 text-sm mb-2">
            3. Click Start and begin your sales call with Alex.
          </ol>
          <ol className="text-slate-500 text-sm mb-2">
            4. After you're done speaking, press stop and wait for Alex's
            response.
          </ol>
          <ol className="text-slate-500 text-sm mb-2">
            5. Repeat until call is complete
          </ol>
          <ol className="text-slate-500 text-sm mb-2">
            6. Press End Call button to receive your call feedback
          </ol>
        </ul>
      </div>
    </div>
  );
};

export default Call;
