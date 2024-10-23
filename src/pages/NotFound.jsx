import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const GoToHome = () => {
    navigate("/");
  };
  return (
    <div className="flex flex-col items-center mt-12">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-xl">Page Not Found!</p>
      <button onClick={GoToHome}>
        Go back to <span className="text-blue-500 font-semibold">Home Page</span>
      </button>
    </div>
  );
};

export default NotFound;
