import React, { useState } from "react";
import NavLinks from "./NavLinks";
import search from "./../svgs/search.svg";
import { Link } from "react-router-dom";

const HamburgerMenu = (props) => {
  return (
    <div>
      <div className={`fixed z-10 left-0 top-0 h-full w-80 max-sm:w-60 pt-20 bg-red-800 transform ${props.isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out`}>
        <NavLinks buttonClick={props.toggleMenu} />
        <div className="opacity-70 hover:opacity-100 flex items-center max-xl:pl-2 max-xl:mt-10">
          <input className="h-14 max-sm:w-[165px] px-4 rounded-tl-xl rounded-bl-xl focus:outline-none" placeholder="Find a Movie!" onChange={props.value} />
          <Link to="/search">
            <button className="bg-white p-4 h-14 rounded-tr-xl rounded-br-xl " onClick={props.search}>
              <img className="h-5 w-5" src={search} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HamburgerMenu;
