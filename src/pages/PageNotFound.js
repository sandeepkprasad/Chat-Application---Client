import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="w-screen h-screen bg-backgroundColor flex flex-col justify-center items-center space-y-3">
      <span className="font-inter font-semibold text-2xl text-primaryColor">
        Page Not Found
      </span>
      <Link to="/" className="primaryButton">
        Go to Home
      </Link>
    </div>
  );
};

export default PageNotFound;
