import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = ({ children }) => {
  const token = Cookies.get("chatAppUserToken");

  // Redirect to login if not authenticated
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
