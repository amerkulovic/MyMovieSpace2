import search from "./../svgs/search.svg";
import bookmark from "./../svgs/bookmark.svg";
import login from "./../svgs/right-to-bracket-solid.svg";
import { Link } from "react-router-dom";
import HamburgerMenu from "./HamburgerMenu";
import NavLinks from "./NavLinks";
import React, { useState } from "react";

const Nav = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-gradient-to-r from-black via-red-700 to-black flex items-center max-xl:justify-between justify-center py-4">
      <div className="hidden max-xl:flex">
        <button onClick={toggleMenu} className="z-20 ml-5 px-3 py-2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-lg text-red-800 font-bold text-2xl ">
          X
        </button>
        <HamburgerMenu isOpen={isOpen} toggleMenu={toggleMenu} search={props.search} value={props.value} />
      </div>
      <Link to="/">
        <h1 className="header-font text-white text-6xl mr-10 max-xl:m-0 max-sm:text-5xl">MyMovieSpace</h1>
      </Link>
      <div className="ml-4 flex items-center">
        <div className="max-xl:hidden">
          <NavLinks />
        </div>
        <div className="opacity-70 hover:opacity-100 flex items-center max-xl:hidden">
          <input className="h-14 px-4 rounded-tl-xl rounded-bl-xl focus:outline-none" placeholder="Find a Movie!" onChange={props.value} />
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

export default Nav;
