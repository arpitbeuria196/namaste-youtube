import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { liveMessages } from "../utils/messageSlice";
import { generateRandomName, makeRandomMessage } from "../utils/helper";

const LiveChat = () => {
  const messages = useSelector((store) => store.message.messages); // Adjusted selector for simplified state
  const dispatch = useDispatch();
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(
        liveMessages({
          name: generateRandomName(),
          message: makeRandomMessage(20),
        })
      );
    }, 2000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      dispatch(
        liveMessages({
          name: "You",
          message: inputMessage,
        })
      );
      setInputMessage(""); // Clear the input field
    }
  };

  return (
    <div className="w-1/3 h-3/4 bg-gray-100 p-4 rounded-lg shadow-md flex flex-col">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
        Live Chat
      </h2>
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg shadow-sm ${
              msg.name === "You" ? "bg-blue-100 text-blue-800" : "bg-gray-200 text-gray-800"
            }`}
          >
            <p className="font-semibold">{msg.name}:</p>
            <p>{msg.message}</p>
          </div>
        ))}
      </div>
      {/* Input Field */}
      <div className="mt-4 flex">
        <input
          className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none"
          type="text"
          placeholder="Type a message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button
          className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default LiveChat;
