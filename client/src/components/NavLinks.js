import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

const NavLinks = (props) => {
  const { isLoggedIn } = useAuth();
  return (
    <section>
      <ul className="flex flex-row mr-10 max-lg:flex-col max-lg:text-red-700 max-lg:z-20 max-lg:text-2xl">
        {!isLoggedIn && (
          <>
            <li className="mx-3 opacity-80 py-[10px] hover:opacity-100">
              <Link to="/signup">
                <button className="movie-header" onClick={props.buttonClick}>
                  Create Account
                </button>
              </Link>
            </li>
            <li className="mx-3 opacity-80 py-[10px] hover:opacity-100">
              <Link to="/login">
                <button className="movie-header" onClick={props.buttonClick}>
                  Login
                </button>
              </Link>
            </li>
          </>
        )}
        <li className="mx-3 opacity-80 py-[10px] hover:opacity-100">
          <Link to="/messages">
            <button className="movie-header" onClick={props.buttonClick}>
              Message Board
            </button>
          </Link>
        </li>
        {isLoggedIn && (
          <>
            <li className="mx-3 opacity-80 py-[10px] hover:opacity-100">
              <Link to="/bookmarks">
                <button className="movie-header" onClick={props.buttonClick}>
                  Bookmarks
                </button>
              </Link>
            </li>
            <li className="mx-3 opacity-80 py-[10px] hover:opacity-100">
              <Link to="/watched-movies">
                <button className="movie-header" onClick={props.buttonClick}>
                  Watched Movies
                </button>
              </Link>
            </li>
            <li className="mx-3 opacity-80 py-[10px] hover:opacity-100">
              <Link to="/profile">
                <button className="movie-header" onClick={props.buttonClick}>
                  Profile
                </button>
              </Link>
            </li>
            <li className="mx-3 opacity-80 py-[10px] hover:opacity-100">
              <button className="movie-header" onClick={props.logoutHandler}>
                Log Out
              </button>
            </li>
          </>
        )}
      </ul>
    </section>
  );
};

export default NavLinks;
