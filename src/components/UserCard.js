import { useEffect } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useChatContext } from "../contexts/ChatContext";
import { useSocket } from "../contexts/SocketContext";

const UserCard = ({ data }) => {
  const { userData } = useAuthContext();
  const { setUserToChat, setPanelSwitch } = useChatContext();
  const { emitOnlineStatus, onlineUsers } = useSocket();
  const isOnline = onlineUsers[data._id];

  useEffect(() => {
    if (userData?._id) {
      emitOnlineStatus({ userId: userData._id, status: "online" });
    }

    return () => {
      if (userData?._id) {
        emitOnlineStatus({ userId: userData._id, status: "offline" });
      }
    };
  }, [userData, emitOnlineStatus]);

  return (
    <div
      className="w-full h-fit bg-white flex flex-col border rounded-md px-[3%] py-[1%] cursor-pointer"
      onClick={() => {
        setUserToChat(data);
        setPanelSwitch(true);
      }}
    >
      <span className="font-inter font-semibold text-base text-textColor">
        {data.name}{" "}
        <span className="font-normal text-gray-500">({data.username})</span>
      </span>
      <span
        className={`font-inter text-xs ${
          isOnline ? "text-green-500" : "text-gray-500"
        }`}
      >
        {isOnline ? "Online" : "Offline"}
      </span>
    </div>
  );
};

export default UserCard;
