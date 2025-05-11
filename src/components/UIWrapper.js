import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

// Icons
import { FaArrowLeft } from "react-icons/fa";

// Imports
import Notification from "./Notification";
import { useChatContext } from "../contexts/ChatContext";

const UIWrapper = ({ children }) => {
  const { userData, notificationText, handleLogout } = useAuthContext();
  const { panelSwitch, setPanelSwitch } = useChatContext();
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen bg-backgroundColor flex flex-col">
      <div className="w-full h-fit bg-white flex justify-between items-center border-b border-inputBorder px-[2%] py-[0.5%]">
        <div className="flex items-center space-x-3">
          {panelSwitch && (
            <button
              className="text-2xl text-textColor"
              onClick={() => setPanelSwitch(false)}
            >
              <FaArrowLeft />
            </button>
          )}
          <img
            src="/icons/logo.svg"
            alt="logo"
            className="cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          />
          <span className="font-inter font-semibold text-lg text-textColor">
            Chat Application
          </span>
        </div>
        {userData && (
          <div className="flex items-center space-x-5">
            <span className="font-inter font-semibold text-base text-textColor hidden lg:block">
              {userData.name}
            </span>
            <button
              className="font-inter font-semibold text-base text-primaryColor"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
      <div className="w-full flex-grow overflow-y-auto">{children}</div>
      {notificationText.length > 0 && <Notification />}
    </div>
  );
};

export default UIWrapper;
