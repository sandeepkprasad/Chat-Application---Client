import { useState, useEffect, useRef } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useChatContext } from "../contexts/ChatContext";
import { useSocket } from "../contexts/SocketContext";
import socket from "../socket";
import { MdSend } from "react-icons/md";

const ChatPanel = () => {
  const { userData } = useAuthContext();
  const { userToChat, sendMessage, getMessages, chatData, setChatData } =
    useChatContext();
  const { emitTyping, emitOnlineStatus, isTyping, onlineUsers } = useSocket();
  const isOnline = onlineUsers[userToChat._id];
  const [content, setContent] = useState("");
  const messagesEndRef = useRef(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatData]);

  // Fetch messages initially
  useEffect(() => {
    if (!userData || !userToChat) return;
    getMessages(userData._id, userToChat._id);
  }, [userData, userToChat, getMessages]);

  // Listen for real-time incoming messages
  useEffect(() => {
    if (!socket || !userToChat || !userData) return;

    const handleReceiveMessage = (message) => {
      if (
        (message.sender === userToChat._id &&
          message.receiver === userData._id) ||
        (message.receiver === userToChat._id && message.sender === userData._id)
      ) {
        setChatData((prev) => [...prev, message]);
      }
    };

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage); // Cleanup
    };
  }, [userToChat, userData, setChatData]);

  const handleSend = async () => {
    if (!content.trim()) return;

    const senderId = userData._id;
    const receiverId = userToChat._id;

    try {
      const newMessage = await sendMessage({ senderId, receiverId, content });

      if (newMessage?.success) {
        socket.emit("sendMessage", newMessage.message);
        setChatData((prev) => [...prev, newMessage.message]);
        setContent("");
      }
    } catch (err) {
      console.error("Failed to send message:", err.message);
    }
  };

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
    <div className="w-full h-full flex flex-col justify-between items-center">
      {/* Header */}
      <div className="w-full h-[20%] lg:h-[10%] bg-white border-b shadow-sm px-[2%] py-[1%]">
        <div className="flex flex-col">
          <span className="font-inter font-semibold text-base text-textColor">
            {userToChat.name}{" "}
            <span
              className={`font-inter text-xs ${
                isOnline ? "text-green-500" : "text-gray-500"
              }`}
            >
              {isOnline ? "Online" : "Offline"}
            </span>
          </span>
          {isTyping && (
            <span className="font-inter font-normal text-xs text-textColor">
              Typing...
            </span>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="w-full flex-grow bg-primaryColor/5 flex flex-col p-[2%] lg:p-[1%] space-y-[2%] lg:space-y-[1%] overflow-y-auto scrollbar-hide">
        {chatData?.map((chat, index) => (
          <div
            key={index}
            className={`w-full h-fit flex ${
              chat.sender === userData._id ? "justify-end" : "justify-start"
            } items-center`}
          >
            <span
              className={`font-inter text-[4vw] lg:text-[1vw] text-white ${
                chat.sender === userData._id
                  ? "bg-primaryColor rounded-3xl"
                  : "bg-gray-700 rounded-3xl"
              } px-2 py-1`}
            >
              {chat.content}
            </span>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="w-full h-[25%] lg:h-[10%] flex justify-between items-center space-x-2 p-[2%] lg:p-[1%]">
        <input
          type="text"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            emitTyping();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
          placeholder="Type a message..."
          className="w-full h-10 border-2 border-inputBorderColor rounded-md px-[1%] outline-none font-inter text-textColor"
        />
        <button
          disabled={content.length === 0}
          className={`${
            content.length === 0 ? "bg-gray-300" : "bg-primaryColor"
          } rounded-full p-1.5`}
          onClick={handleSend}
        >
          <MdSend className="text-[4.5vw] lg:text-[1.5vw] text-white" />
        </button>
      </div>
    </div>
  );
};

export default ChatPanel;
