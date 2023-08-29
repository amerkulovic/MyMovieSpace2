import React, { useState } from "react";
import NavLinks from "./NavLinks";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={toggleMenu} className="absolute right-5 top-5 z-20 px-3 py-2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-lg text-red-800 font-bold text-2xl">
        X
      </button>

      <div className={`fixed z-10 left-0 top-0 h-full w-80 max-sm:w-60 pt-20 bg-red-800 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out`}>
        <NavLinks />
      </div>
    </div>
  );
};

export default HamburgerMenu;
