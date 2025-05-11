import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { baseUrl } from "../utils/otherUtils";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [notificationText, setNotificationText] = useState("");

  // User Register
  const userRegister = useCallback(
    async (userRegisterCred) => {
      const { name, username, password } = userRegisterCred;

      setLoading(true);
      try {
        const response = await axios.post(`${baseUrl}/api/users/register`, {
          name,
          username,
          password,
        });

        // Store token in cookies
        Cookies.set("chatAppUserToken", response.data.token, { expires: 30 });

        // Store user info in state
        setUserData({
          _id: response.data._id,
          name: response.data.name,
          username: response.data.username,
        });

        navigate("/");
        setNotificationText("Registration Successful");
      } catch (error) {
        console.log(error.response?.data?.message);
        setNotificationText(error.response?.data?.message);
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  // User Login
  const userLogin = useCallback(
    async (userLoginCred) => {
      const { username, password } = userLoginCred;

      setLoading(true);
      try {
        const response = await axios.post(`${baseUrl}/api/users/login`, {
          username,
          password,
        });

        // Store token in cookies
        Cookies.set("chatAppUserToken", response.data.token, { expires: 30 });

        // Store user info in state
        setUserData({
          _id: response.data._id,
          name: response.data.name,
          username: response.data.username,
        });

        navigate("/");
        setNotificationText("Login Successful");
      } catch (error) {
        console.log(error.response?.data?.message);
        setNotificationText(error.response?.data?.message);
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  // Auto-login if token cookie exists
  const fetchLoggedInUser = useCallback(async () => {
    const token = Cookies.get("chatAppUserToken");
    if (!token) return;

    try {
      const response = await axios.get(`${baseUrl}/api/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Store user info in state
      setUserData({
        _id: response.data._id,
        name: response.data.name,
        username: response.data.username,
      });

      navigate("/");
    } catch (error) {
      console.error("Auto-login failed:", error.response?.data?.message);
      setNotificationText(error.response?.data?.message);
      Cookies.remove("chatAppUserToken");
    }
  }, [navigate]);

  useEffect(() => {
    fetchLoggedInUser();
  }, [fetchLoggedInUser]);

  // User Logout
  const handleLogout = async () => {
    const token = Cookies.get("chatAppUserToken");

    try {
      await axios.post(
        `${baseUrl}/api/users/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.error("Logout error", err);
      setNotificationText(err);
    }

    Cookies.remove("chatAppUserToken");
    navigate("/login");
    setNotificationText("Logged out successfully");
  };

  return (
    <AuthContext.Provider
      value={{
        userData,
        userRegister,
        userLogin,
        loading,
        notificationText,
        setNotificationText,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthProvider;
