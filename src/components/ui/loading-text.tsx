import React from "react";

const LoadingText = () => {
  return (
    <div className="flex items-center min-h-20 gap-2 justify-center">
      <span className="text-lg font-semibold text-gray-700">Yükleniyor</span>
      <span className="flex min-h-full">
        <span className="animate-[bounce_1.2s_infinite]">.</span>
        <span className="animate-[bounce_1.2s_infinite_0.2s]">.</span>
        <span className="animate-[bounce_1.2s_infinite_0.4s]">.</span>
      </span>
    </div>
  );
};

export default LoadingText;
