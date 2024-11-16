import React from "react";
import "tailwindcss/tailwind.css";
import LoadingSpinner from "./loading-spinner";

const LoadingBar: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-60 z-50 w-screen bg-black-800 h-screen backdrop-blur-sm duration-500 ease-in-out">
      <LoadingSpinner className="w-32 h-32" />
    </div>
  );
};

export default LoadingBar;
