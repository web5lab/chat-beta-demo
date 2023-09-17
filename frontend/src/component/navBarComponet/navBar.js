import React, { useContext, useEffect, useState } from "react";
import { FaGithub, FaUser } from "react-icons/fa"; // Import FaUser for the user profile icon
import { SocketContext } from "../../socket/socketContext";
import { useDispatch, useSelector } from "react-redux"; // Import useSelector for authentication state
import {
  addChat,
  updateProfilePicture,
  updatename,
} from "../../App/features/chatFeatures/chatSlice";
import { getUserData, githubAuth } from "../../App/features/authFeature/authAction";
import { useNavigate } from "react-router-dom";
import { logout } from "../../App/features/authFeature/authSlice";
import { Modal } from "antd";
import ProfileModal from "../profileModal/profileModal";
import { AUTHENTICRNTED } from "../authComponent/authSelector";

function NavBar() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [profile, setprofile] = useState(false)
  
  const userLogger = async (code) => {
    dispatch(githubAuth(code));
  };

  const isAuthenticated = useSelector(AUTHENTICRNTED)



  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const loginGithub = async () => {
    window.location.href =
      "https://github.com/login/oauth/authorize?scope=user&client_id=cf1326a4b34906726e8e&redirect_uri=http://localhost:3000";
  };

  // Add a function to handle user logout
  const handleLogout = () => {
    dispatch(logout());
    // You can also clear any user data or tokens from local storage here
  };

  useEffect(() => {
    const url = window.location.href;
    const hasCode = url.includes("?code=");

    const jwt = localStorage.getItem("jwt");

    if(jwt){
      console.log("jwt token", jwt);
      dispatch(getUserData(jwt))
    }

    if (hasCode) {
      const newUrl = url.split("?code=");
      const code = newUrl[1];
      userLogger(code);
      navigate("/");
    }
  }, []);

  const closeProfile = () => {
    setprofile(false);
  }
  const addNewChat = ({ chatData }) => {
    new Notification('New Data Received')
    dispatch(addChat(chatData));
  };

  const updateProfilePic = (obj) => {
    dispatch(updateProfilePicture(obj));
  };

  const updateName = (obj) => {
    dispatch(updatename(obj));
  };

 
  useEffect(() => {
    socket.on("newChat", addNewChat);
    socket.on("nameChange", updateName);
    socket.on("profileUpdate", updateProfilePic);

    return () => {
      socket.off("newChat", addNewChat);
      socket.off("updateName", updateName);
      socket.off("profileUpdate", updateProfilePic);
    };
  }, []);

  return (
    <nav
      className={`${
        isDarkMode
          ? "bg-black"
          : "bg-gradient-to-r from-blue-500 via-blue-600 to-purple-500"
      } p-4 relative`}
    >
       <Modal
        // width={520}
        open={profile}
        footer={null}
        onCancel={closeProfile}
      >
        <ProfileModal></ProfileModal>
      </Modal>
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-semibold text-white">Chat Demo</div>
        <div className="flex items-center space-x-4">
          {/* Conditionally render the GitHub login button or user profile section */}
          {isAuthenticated ? (
            <div className="flex items-center space-x-2">
              <div
                className={`${
                  isDarkMode
                    ? "text-white hover:text-blue-300"
                    : "text-blue-500 hover:text-blue-300"
                }`}
              >
                <FaUser className="text-xl" onClick={() => {
                  setprofile(true)
                }} />
              </div>
              <button
                className={`${
                  isDarkMode
                    ? "bg-gray-800 text-white hover:bg-gray-700"
                    : "bg-blue-500 text-white hover:bg-blue-400"
                } py-2 px-4 rounded-lg`}
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <a
              href="https://github.com/login/oauth/authorize?scope=user&client_id=cf1326a4b34906726e8e&redirect_uri=https://beta.shibx.live"
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
                onClick={() => {
                  loginGithub();
                }}
              >
                <FaGithub className="text-xl" />
                Login with GitHub
              </button>
            </a>
          )}
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
