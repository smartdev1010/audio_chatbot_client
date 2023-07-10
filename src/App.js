import logo from "./logo.svg";
import "./App.css";
import Call from "./components/call";
import Output from "./components/output";
import Recording from "./components/recording";

function App() {
  return (
    <div className="flex pt-20 px-10">
      <Call className="w-1/4" />
      <div className="w-3/4">
        <Recording />
        <Output />
      </div>
    </div>
  );
}

export default App;
