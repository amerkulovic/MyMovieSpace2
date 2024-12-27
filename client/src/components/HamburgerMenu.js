import NavLinks from "./NavLinks";
import search from "./../svgs/search.svg";
import { Link } from "react-router-dom";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const HamburgerMenu = (props) => {
  return (
    // <div>
    <div className={`fixed z-10 left-0 top-0 h-full w-full pt-[100px] pl-10 bg-red-800 transform transition-transform duration-300 ease-in-out ${props.isOpen ? "translate-x-0" : "-translate-x-full"}`}>
      <div className={`${props.isOpen ? "" : "hidden"} max-lg:flex fixed top-8 left-8`}>
        <button onClick={props.toggleMenu} className="z-20 ml-5 px-3 py-2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-lg text-red-800 font-bold text-2xl max-xsm:ml-2 max-xsm:px-2 ">
          <FontAwesomeIcon icon={!props.isOpen ? faBars : faX} />
        </button>
      </div>
      <NavLinks buttonClick={props.toggleMenu} />
      <div className="opacity-70 hover:opacity-100 flex items-center max-xl:pl-2 max-xl:mt-10">
        <input className="h-14 max-sm:w-[165px] px-4 rounded-tl-xl rounded-bl-xl focus:outline-none" placeholder="Find a Movie!" onChange={props.value} />
        <Link to="/search">
          <button className="bg-white p-4 h-14 rounded-tr-xl rounded-br-xl" onClick={props.search}>
            <img className="h-5 w-5" src={search} />
          </button>
        </Link>
      </div>
    </div>
    // </div>
  );
};

export default HamburgerMenu;
