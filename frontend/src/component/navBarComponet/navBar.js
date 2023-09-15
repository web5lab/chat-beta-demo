import React, { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";

function NavBar() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const url = window.location.href;
    const hasCode = url.includes("?code=");

    if (hasCode) {
      const newUrl = url.split("?code=");
      const code = newUrl[1];
      alert(code);
      window.location.replace("http://localhost:3000");
    }
  }, []);

  return (
    <nav
      className={`${
        isDarkMode
          ? "bg-black"
          : "bg-gradient-to-r from-blue-500 via-blue-600 to-purple-500"
      } p-4 relative`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-semibold text-white">Chat Demo</div>
        <div className="flex items-center space-x-4">
          <a
            href="/"
            className={`${
              isDarkMode
                ? "text-white hover:text-blue-300"
                : "text-blue-500 hover:text-blue-300"
            }`}
          >
            <button
              className={`${
                isDarkMode
                  ? "bg-gray-800 text-white hover:bg-gray-700"
                  : "bg-blue-500 text-white hover:bg-blue-400"
              } py-2 px-4 rounded-lg flex items-center space-x-2`}
            >
              <FaGithub className="text-xl" />
              Login with GitHub
            </button>
          </a>
        </div>
      </div>
      <label
        className={`${
          isDarkMode ? "bg-gray-600" : "bg-blue-500"
        } rounded-full w-16 h-8 flex items-center cursor-pointer absolute top-4 right-4`}
      >
        <div
          className={`${
            isDarkMode
              ? "bg-white w-6 h-6 rounded-full transform translate-x-8 transition-transform"
              : "bg-white w-6 h-6 rounded-full transition-transform"
          }`}
        ></div>
        <input
          type="checkbox"
          className="hidden"
          checked={isDarkMode}
          onChange={toggleDarkMode}
        />
      </label>
    </nav>
  );
}

export default NavBar;
