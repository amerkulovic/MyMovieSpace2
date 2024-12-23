import { Link } from "react-router-dom";

const NavLinks = (props) => {
  return (
    <section>
      <ul className="flex flex-row mr-10 max-lg:flex-col max-lg:text-red-700 max-lg:z-20 max-lg:text-2xl">
        {/* <li className="mx-3 opacity-80 py-[10px] hover:opacity-100">
          <Link to="/signup">
            <button className="movie-header" onClick={props.buttonClick}>
              Create Account
            </button>
          </Link>
        </li> */}
        {/* <li className="mx-3 opacity-80 py-[10px] hover:opacity-100">
          <Link to="/signin">
            <button className="movie-header" onClick={props.buttonClick}>
              Sign In
            </button>
          </Link>
        </li> */}
        <li className="mx-3 opacity-80 py-[10px] hover:opacity-100">
          <Link to="/messages">
            <button className="movie-header" onClick={props.buttonClick}>
              Message Board
            </button>
          </Link>
        </li>
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
      </ul>
    </section>
  );
};

export default NavLinks;
