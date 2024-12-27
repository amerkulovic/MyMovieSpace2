import search from "./../svgs/search.svg";
import bookmark from "./../svgs/bookmark.svg";
import login from "./../svgs/right-to-bracket-solid.svg";
import { Link } from "react-router-dom";
import HamburgerMenu from "./HamburgerMenu";
import NavLinks from "./NavLinks";
import React, { useState } from "react";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Nav = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-gradient-to-r from-black via-red-700 to-black flex items-center max-lg:justify-between justify-center py-4">
      <div className="hidden max-lg:flex">
        <button onClick={props.toggleMenu} className={`z-20 ml-5 px-3 py-2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-lg text-red-800 font-bold text-2xl max-xsm:ml-2 max-xsm:px-2 ${props.isOpen ? "hidden" : ""}`}>
          <FontAwesomeIcon icon={!props.isOpen ? faBars : faX} />
        </button>
      </div>
      <div className="flex justify-end max-lg:justify-center w-[35%]">
        <Link to="/">
          <h1 className="header-font text-white text-6xl text-center mr-10 max-lg:m-0 max-sm:text-5xl">MyMovieSpace</h1>
        </Link>
      </div>
      <div className="ml-4 flex justify-around items-center w-[55%] max-lg:w-[0%]">
        <div className="max-lg:hidden">
          <NavLinks />
        </div>
        <div className="opacity-70 hover:opacity-100 flex items-center pr-10 max-lg:hidden">
          <input className="h-14 px-4 rounded-tl-xl rounded-bl-xl focus:outline-none" placeholder="Find a Movie!" onChange={props.value} />
          <Link to="/search">
            <button className="bg-white p-4 h-14 rounded-tr-xl rounded-br-xl" onClick={props.search}>
              <img className="h-5 w-5" src={search} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Nav;
