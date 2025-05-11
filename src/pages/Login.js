import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

// Imports
import UIWrapper from "../components/UIWrapper";

const Login = () => {
  const { userLogin, loading } = useAuthContext();
  const [userLoginCred, setUserLoginCred] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  return (
    <UIWrapper>
      <div className="w-full h-full flex justify-between items-start">
        <div className="w-1/3 h-full bg-primaryColor/5 flex flex-col justify-center items-center">
          <span className="font-inter font-semibold text-[2vw] text-textColor">
            Welcome to
          </span>
          <span className="font-inter font-semibold text-[2vw] text-textColor">
            Chat Application
          </span>
        </div>
        <div className="w-2/3 h-full bg-white flex justify-center items-center border-s border-inputBorder">
          <div className="w-1/2 h-fit flex flex-col space-y-[3%]">
            <span className="font-inter font-semibold text-[1.5vw] text-textColor">
              Login
            </span>
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="w-full h-10 border-2 border-inputBorderColor rounded-md px-[2%] outline-none font-inter text-textColor"
              value={userLoginCred.username}
              onChange={(e) =>
                setUserLoginCred({ ...userLoginCred, username: e.target.value })
              }
            />
            <div className="w-full h-10 relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full h-10 border-2 border-inputBorderColor rounded-md px-[2%] outline-none font-inter text-textColor"
                value={userLoginCred.password}
                onChange={(e) =>
                  setUserLoginCred({
                    ...userLoginCred,
                    password: e.target.value,
                  })
                }
              />
              <button
                className="font-inter font-normal text-xs text-textColor absolute top-1/3 right-2"
                onClick={() => {
                  setShowPassword((prev) => !prev);
                }}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <button
              className="primaryButton"
              disabled={loading}
              onClick={() => userLogin(userLoginCred)}
            >
              {loading ? "Please wait..." : "Login"}
            </button>
            <p className="font-inter font-normal text-xs text-textColor">
              Don't have an account?{" "}
              <Link to="/register" className="font-semibold text-primaryColor">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </UIWrapper>
  );
};

export default Login;
