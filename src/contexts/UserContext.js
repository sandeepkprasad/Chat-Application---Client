import { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { baseUrl } from "../utils/otherUtils";
import { useAuthContext } from "./AuthContext";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const { setNotificationText } = useAuthContext;
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchResults, setIsSearchResults] = useState(false);

  const handleSearch = useCallback(async () => {
    const token = Cookies.get("chatAppUserToken");

    if (!token || searchQuery.trim() === "") return;

    try {
      const response = await axios.get(`${baseUrl}/api/users/search`, {
        params: { searchQuery },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSearchResults(response.data);

      if (response.data.length > 0) {
        setIsSearchResults(true);
      }
    } catch (error) {
      console.error(error.response?.data?.message || "Search failed");
      setNotificationText(error.response?.data?.message || "Search failed");
      setSearchResults([]);
    }
  }, [searchQuery, setNotificationText]);

  return (
    <UserContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        searchResults,
        setSearchResults,
        handleSearch,
        isSearchResults,
        setIsSearchResults,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

export default UserProvider;
