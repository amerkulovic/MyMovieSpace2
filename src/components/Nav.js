import search from "./../svgs/search.svg";
import bookmark from "./../svgs/bookmark.svg";
import login from "./../svgs/right-to-bracket-solid.svg";
import { Link } from "react-router-dom";

const Nav = (props) => {
  return (
    <div className="bg-gradient-to-r from-black via-red-700 to-black flex items-center justify-center py-4">
      <h1 className="header-font text-white text-6xl mr-10">MyMovieSpace</h1>
      <div className="ml-4 flex items-center">
        <section>
          <ul className="flex flex-row mr-10">
            <li className="mx-3 opacity-80 hover:opacity-100">
              <button className="movie-header">Create Account</button>
            </li>
            <li className="mx-3 opacity-80 hover:opacity-100">
              <button className="movie-header">Sign In</button>
            </li>
            <li className="mx-3 opacity-80 hover:opacity-100">
              <button className="movie-header">Message Board</button>
            </li>
          </ul>
        </section>
        <div className="opacity-70 hover:opacity-100 flex items-center">
          <input className="h-14 px-4 rounded-tl-xl rounded-bl-xl" placeholder="Find a Movie!" onChange={props.value} />
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
