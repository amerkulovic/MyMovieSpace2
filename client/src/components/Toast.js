import React, { useState, useEffect } from "react";

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      //   onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return <div className="fixed bottom-5 bg-red-800 p-10 border-4 border-white text-white text-4xl py-2 px-4 rounded shadow-lg animate-fadeInUp animate-fadeInDown movie-header">{message}</div>;
};

export default Toast;
