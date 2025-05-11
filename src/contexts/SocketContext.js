import { createContext, useContext, useEffect, useState } from "react";
import socket from "../socket";
import { useAuthContext } from "./AuthContext";

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const { userData } = useAuthContext();
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState({});

  useEffect(() => {
    if (!socket) return;

    socket.on("connect", () => {
      console.log("Connected to socket:", socket.id);
    });

    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.on("typing", (data) => {
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 2000);
    });

    socket.on("onlineStatus", ({ userId, status }) => {
      console.log("User online status updated:", userId, status);
      setOnlineUsers((prev) => ({
        ...prev,
        [userId]: status === "online",
      }));
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("typing");
      socket.off("onlineStatus");
      socket.disconnect();
    };
  }, []);

  // Send message via socket
  const sendMessage = (message) => {
    socket.emit("sendMessage", message);
    setMessages((prev) => [...prev, message]);
  };

  // Emit typing event
  const emitTyping = () => {
    socket.emit("typing", { sender: userData?._id });
  };

  // Emit online status
  const emitOnlineStatus = (status) => {
    socket.emit("onlineStatus", status);
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        messages,
        setMessages,
        sendMessage,
        emitTyping,
        emitOnlineStatus,
        isTyping,
        onlineUsers,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);

export default SocketProvider;
