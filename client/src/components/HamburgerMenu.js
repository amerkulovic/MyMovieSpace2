import React, { useState } from "react";
import NavLinks from "./NavLinks";

const HamburgerMenu = ({ isOpen, toggleMenu }) => {
  return (
    <div>
      <div className={`fixed z-10 left-0 top-0 h-full w-80 max-sm:w-60 pt-20 bg-red-800 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out`}>
        <NavLinks buttonClick={toggleMenu} />
      </div>
    </div>
  );
};

export default HamburgerMenu;
