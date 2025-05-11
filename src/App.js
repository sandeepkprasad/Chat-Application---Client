import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

// Contexts
import AuthProvider from "./contexts/AuthContext";
import UserProvider from "./contexts/UserContext";
import ChatProvider from "./contexts/ChatContext";
import SocketProvider from "./contexts/SocketContext";

// Pages
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ChatPage from "./pages/ChatPage";
import PageNotFound from "./pages/PageNotFound";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <UserProvider>
          <ChatProvider>
            <SocketProvider>
              <Routes>
                {/* Public Routes */}
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<PageNotFound />} />

                {/* Private Routes */}
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <Home />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/chat"
                  element={
                    <PrivateRoute>
                      <ChatPage />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </SocketProvider>
          </ChatProvider>
        </UserProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
