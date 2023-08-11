import { useSelector } from "react-redux";
import { useRef, useEffect } from "react";

const Output = () => {
  const history = useSelector((state) => state.history.history);
  const settings = useSelector((state) => state.history.settings);
  const url = useSelector((state) => state.history.currenturl);
  console.log(url);
  const bottomEl = useRef(null);
  const scrollToBottom = () => {
    bottomEl?.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  return (
    <div className="px-4 pt-6 space-y-4 lg:px-6 h-[350px] overflow-auto">
      <div className="flex flex-col space-y-4">
        {history.map((item) =>
          item.type == "user" ? (
            <div className="flex items-start max-w-lg pt-3">
              <img
                src="user.png"
                className="w-12 h-12 mr-3 rounded-full"
                alt="Image placeholder"
              />
              <div className="flex-1">
                <div className="px-4 py-4 rounded-md bg-gradient-to-b from-gray-100 to-white lg:px-6 lg:pb-6">
                  <div className="flex items-end justify-between pb-3">
                    <span className="flex space-x-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-green-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span className="text-sm font-semibold text-gray-700 transition-colors duration-300 hover:text-gray-700">
                        {settings.user}
                      </span>
                    </span>
                  </div>
                  <p className="block text-sm text-gray-800">{item.value}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-start self-end max-w-lg pt-3 space-x-3">
              <img
                src="bot.png"
                className="order-2 w-12 h-12 ml-3 rounded-full"
                alt="Image placeholder"
              />
              <div className="flex-1 order-1">
                <div className="px-4 py-4 rounded-md bg-gradient-to-b from-gray-100 to-white lg:px-6 lg:pb-6">
                  <div className="flex items-end justify-between pb-3">
                    <span className="text-sm font-semibold text-gray-700 transition-colors duration-300 hover:text-gray-700">
                      Alex
                    </span>
                  </div>
                  <p className="block text-sm text-gray-800">{item.value}</p>
                </div>
              </div>
            </div>
          )
        )}
      </div>
      <div ref={bottomEl}></div>
    </div>
  );
};

export default Output;
