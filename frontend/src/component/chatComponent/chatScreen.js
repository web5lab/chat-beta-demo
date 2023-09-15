import React, { useState, useEffect, useRef } from "react";
import {  FaCamera, FaTimes } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import toast from "react-hot-toast";

const ChatScreen = () => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const [input, setInput] = useState("");
  const [image, setImage] = useState(null);
  const [messageToPreview, setMessageToPreview] = useState(""); // To preview messages before sending
  const [messages, setMessages] = useState([
    {
      id: 1,
      userDetails: {
        name: "John",
        profilePic: "https://via.placeholder.com/50",
      },
      timeStamp: Date.now() - 60000,
      msg: "Hello!",
    },
    {
      id: 2,
      userDetails: {
        name: "Alice",
        profilePic: "https://via.placeholder.com/50",
      },
      timeStamp: Date.now() - 30000,
      msg: "Hi there!",
    },
    // Add more dummy messages here
  ]);

  const formatTimestamp = (timestamp_ms) => {
    const currentDate = new Date(timestamp_ms);
    let hour = currentDate.getHours();
    const minute = String(currentDate.getMinutes()).padStart(2, "0");
    const ampm = hour >= 12 ? "PM" : "AM";

    hour = hour % 12;
    hour = hour === 0 ? 12 : hour;

    return `${hour}:${minute} ${ampm}`;
  };

  const sendMessage = (e) => {
    e.preventDefault();

    if (input.trim() !== "" || image) {
      if (messageToPreview) {
        // If a message is in the preview, send it instead of the input field value
        setInput(messageToPreview);
        setMessageToPreview("");
      }

      const newMessage = {
        id: messages.length + 1,
        userDetails: {
          name: "You",
          profilePic: "https://via.placeholder.com/50",
        },
        timeStamp: Date.now(),
        msg: input,
        image,
      };

      setMessages([...messages, newMessage]);
      setInput("");
      setImage(null);
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    } else {
      toast.error("Please enter a message or select an image", {
        position: "top-right",
        className: "mt-10",
        duration: 2000,
        style: {
          borderRadius: "10px",
          background: "#fff",
          color: "#3bc117",
          fontWeight: 800,
        },
      });
    }
  };

  const handleImageUpload = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
        setInput(""); // Clear the input field when an image is selected
        setMessageToPreview(""); // Clear the message preview
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  return (
    <div
      className="flex flex-col bg-gradient-to-r from-blue-500 via-blue-600 to-purple-500 text-white"
      style={{ height: "calc(100vh - 74px)" }}
    >
      <div className="overflow-auto overflow-x-hidden p-4 flex-grow">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start m-2 p-2 rounded-lg shadow-md ${
              msg.userDetails.name === "You" ? "bg-blue-600" : "bg-gray-800 text-white"
            }`}
          >
            <img
              src={msg?.userDetails?.profilePic}
              alt="Profile"
              className="w-8 h-8 rounded-full mr-2"
            />
            <div className="flex flex-col flex-grow">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  {msg?.userDetails?.name}
                </span>
                <span className="text-xs text-gray-300">
                  {formatTimestamp(msg?.timeStamp)}
                </span>
              </div>
              <div className="mt-1 max-w-md overflow-hidden overflow-ellipsis whitespace-wrap break-words">
                {msg?.msg}
              </div>
              {msg.image && (
                <img
                  src={msg.image}
                  alt="Uploaded"
                  className="mt-2 rounded-md max-w-md"
                />
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>
      <div className="mt-4 mx-4 mb-2">
        <form onSubmit={sendMessage} className="flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            className="flex-grow p-2 rounded-l-lg bg-gray-700 text-white focus:outline-none"
          />
          <label className="relative cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
            <span className="p-2 rounded-r-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer">
              <FaCamera className="ml-2 text-white" /> Upload Image
            </span>
          </label>
          <button
            type="submit"
            className="flex items-center p-2 rounded-r-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            Send <FiSend className="ml-2 text-white" />
          </button>
          {messageToPreview && (
            <div className="flex items-center ml-2 space-x-2">
              <div className="bg-gray-700 p-2 rounded-lg max-w-md text-white">
                {messageToPreview}
              </div>
              <button
                className="text-red-600 hover:text-red-800"
                onClick={() => setMessageToPreview("")}
              >
                <FaTimes />
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ChatScreen;
