import search from "./../svgs/search.svg";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import NavLinks from "./NavLinks";
import React, { useState } from "react";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Nav = (props) => {
  let { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  // const toggleMenu = () => {
  //   setIsOpen(!isOpen);
  // };

  const keySearchHandler = (event) => {
    if (event.key === "Enter") {
      props.search();
      navigate("/search");
    }
  };

  return (
    <div className="bg-gradient-to-r from-red-900 via-red-700 to-red-900 flex items-center max-lg:justify-between justify-center py-4">
      <div className="hidden max-lg:flex">
        <button onClick={props.toggleMenu} className={`z-20 ml-5 px-3 py-2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-lg text-red-800 font-bold text-2xl max-xsm:ml-2 max-xsm:px-2 ${props.isOpen ? "hidden" : ""}`}>
          <FontAwesomeIcon icon={!props.isOpen ? faBars : faX} />
        </button>
      </div>
      <div className={`flex justify-end max-lg:justify-center ${isLoggedIn ? "w-[33%]" : "w-[33%]"}`}>
        <Link to="/">
          <h1 className="header-font text-white text-6xl text-center mr-10 max-lg:m-0 max-sm:text-5xl">MyMovieSpace</h1>
        </Link>
      </div>
      <div className={`ml-4 flex ${isLoggedIn ? "" : "justify-around "} items-center w-[66%] max-lg:w-[0%]`}>
        <div className="max-lg:hidden">
          <NavLinks logoutHandler={props.logoutHandler} />
        </div>
        <div className="opacity-70 hover:opacity-100 flex items-center pr-10 max-lg:hidden">
          <input className="h-14 px-4 rounded-tl-xl rounded-tr-none rounded-bl-xl rounded-br-none focus:outline-none" placeholder="Find a Movie!" onKeyDown={keySearchHandler} onChange={props.value} />
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
