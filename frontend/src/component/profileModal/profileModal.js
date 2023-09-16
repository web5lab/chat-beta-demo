import React, { useRef, useState } from "react";
import { FaCheck, FaTimes, FaPencilAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { USER_DATA } from "../authComponent/authSelector";
import {
  changeName,
  changeProfilePic,
} from "../../App/features/chatFeatures/chatAction";

function ProfileModal() {
  const [imageAlert, setImageAlert] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUsername, setEditedUsername] = useState();
  const imageInputRef = useRef(null);
  const dispatch = useDispatch();

  const profile = useSelector(USER_DATA);

  const handleImageEdit = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(changeProfilePic({ file: file }));
    }
  };

  // Handlers for editing username
  const startEditing = () => {
    setIsEditing(true);
  };

  const saveEditing = () => {
    const obj = {
      name: editedUsername,
    };
    dispatch(changeName(obj));
    setIsEditing(false);
  };

  return (
    <div className="bg-gradient-to-br from-blue-600 to-gray-700 p-8 h-auto flex flex-col justify-center items-center shadow-xl rounded-lg space-y-8">
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center relative">
          <img
            src={profile?.profilePic}
            alt="Profile"
            className="w-40 h-40 rounded-full shadow-md border-8 border-white"
          />
          <button
            onClick={handleImageEdit}
            className="absolute bottom-2 w-full text-lg  text-white font-bold  flex justify-center items-center p-2  "
          >
            Edit{" "}
          </button>
          <input
            type="file"
            ref={imageInputRef}
            onChange={handleImageChange}
            accept="image/*"
            style={{ display: "none" }}
          />
        </div>

        {isEditing ? (
          <>
            <div className="flex justify-center items-center">
              <input
                type="text"
                value={editedUsername}
                onChange={(e) => setEditedUsername(e.target.value)}
                className="text-white text-2xl font-semibold bg-transparent border-none focus:outline-none  w-auto"
                autoFocus
              />
              <button onClick={saveEditing} className="ml-2 text-green-500">
                <FaCheck style={{ fontSize: "18px" }} />
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="ml-2 text-red-500"
              >
                <FaTimes style={{ fontSize: "18px" }} />
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center">
            <span className="text-white text-2xl font-semibold mr-4">
              {profile?.name}
            </span>
            <button onClick={startEditing} className="text-white">
              <FaPencilAlt />
            </button>
          </div>
        )}

        <div className="text-white text-sm font-semibold">
          {profile?.userId}
        </div>
      </div>
      {imageAlert && (
        <div className="text-white bg-green-500 p-2 rounded text-center">
          Image Updated!
        </div>
      )}
      \
    </div>
  );
}

export default ProfileModal;
