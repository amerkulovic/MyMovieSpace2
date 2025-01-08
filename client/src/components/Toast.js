import React, { useState, useEffect } from "react";

const Toast = ({ message, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return <div className={`fixed top-5 bg-red-800 p-10 border-4 border-white text-white text-4xl py-2 px-4 rounded shadow-lg ${isVisible ? "animate-fadeInUp" : "animate-fadeOutDown"} movie-header`}>{message}</div>;
};

export default Toast;
