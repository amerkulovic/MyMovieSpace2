import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

const LoadingSpinner = ({ color, size }) => {
  return (
    <div className="flex justify-center items-center">
      <FontAwesomeIcon
        className={`text-2xl ${color ? `text-${color}-700 ` : "text-red-700 "} ${size === "small" ? "h-8 w-8" : "h-20 w-20"} py-10`}
        icon={faCircleNotch}
        spin
        size={`text-2xl`}
        style={{
          animation: "spin 2s linear infinite",
        }}
      />
      <style>
        {`
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
};

export default LoadingSpinner;
