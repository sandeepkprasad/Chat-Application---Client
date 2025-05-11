import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

// Imports
import UIWrapper from "../components/UIWrapper";

const Register = () => {
  const { userRegister, loading } = useAuthContext();
  const [userRegisterCred, setUserRegisterCred] = useState({
    name: "",
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  return (
    <UIWrapper>
      <div className="w-full h-full flex justify-between items-start">
        <div className="w-1/3 h-full bg-primaryColor/5 hidden lg:flex flex-col justify-center items-center">
          <span className="font-inter font-semibold text-[2vw] text-textColor">
            Welcome to
          </span>
          <span className="font-inter font-semibold text-[2vw] text-textColor">
            Chat Application
          </span>
        </div>
        <div className="w-full lg:w-2/3 h-full bg-white flex justify-center items-center border-s border-inputBorder">
          <div className="w-full lg:w-1/2 h-fit flex flex-col space-y-[3%] px-[5%] lg:px-0">
            <span className="font-inter font-semibold text-xl text-textColor">
              Register
            </span>
            <input
              type="text"
              name="username"
              placeholder="Full Name"
              className="w-full h-10 border-2 border-inputBorderColor rounded-md px-[2%] outline-none font-inter text-textColor"
              value={userRegisterCred.name}
              onChange={(e) =>
                setUserRegisterCred({
                  ...userRegisterCred,
                  name: e.target.value,
                })
              }
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="w-full h-10 border-2 border-inputBorderColor rounded-md px-[2%] outline-none font-inter text-textColor mb-4"
              value={userRegisterCred.username}
              onChange={(e) =>
                setUserRegisterCred({
                  ...userRegisterCred,
                  username: e.target.value,
                })
              }
            />
            <div className="w-full h-10 relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full h-10 border-2 border-inputBorderColor rounded-md px-[2%] outline-none font-inter text-textColor"
                value={userRegisterCred.password}
                onChange={(e) =>
                  setUserRegisterCred({
                    ...userRegisterCred,
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
              onClick={() => userRegister(userRegisterCred)}
            >
              {loading ? "Please wait..." : "Register"}
            </button>
            <p className="font-inter font-normal text-xs text-textColor">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-primaryColor">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </UIWrapper>
  );
};

export default Register;
