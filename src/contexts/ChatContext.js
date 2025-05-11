import { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { baseUrl } from "../utils/otherUtils";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [chatHistory, setChatHistory] = useState(null);
  const [userToChat, setUserToChat] = useState(null);
  const [chatData, setChatData] = useState(null);
  const [panelSwitch, setPanelSwitch] = useState(false);

  // Send Message
  const sendMessage = useCallback(async ({ senderId, receiverId, content }) => {
    const token = Cookies.get("chatAppUserToken");

    try {
      const response = await axios.post(
        `${baseUrl}/api/messages/send`,
        {
          senderId,
          receiverId,
          content,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error sending message:", error);
      throw error.response?.data || { message: "Unknown error" };
    }
  }, []);

  // Get Messages
  const getMessages = useCallback(async (userId1, userId2) => {
    const token = Cookies.get("chatAppUserToken");

    try {
      const response = await axios.get(
        `${baseUrl}/api/messages/${userId1}/${userId2}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setChatData(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
      throw error.response?.data || { message: "Unknown error" };
    }
  }, []);

  const getChatUsers = useCallback(
    async (userId) => {
      const token = Cookies.get("chatAppUserToken");

      try {
        const response = await axios.get(
          `${baseUrl}/api/messages/chat-users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setChatHistory(response.data);
      } catch (error) {
        console.error("Error fetching chat users:", error);
        throw error.response?.data || { message: "Unknown error" };
      }
    },
    [setChatHistory]
  );

  return (
    <ChatContext.Provider
      value={{
        userToChat,
        setUserToChat,
        chatData,
        setChatData,
        sendMessage,
        getMessages,
        getChatUsers,
        chatHistory,
        panelSwitch,
        setPanelSwitch,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => useContext(ChatContext);

export default ChatProvider;
