import { Link } from "react-router-dom";

const NavLinks = () => {
  return (
    <section>
      <ul className="flex flex-row mr-10 max-xl:flex-col max-xl:text-red-700 max-xl:z-20 max-xl:text-2xl">
        <li className="mx-3 opacity-80 py-[10px] hover:opacity-100">
          <Link to="/signup">
            <button className="movie-header">Create Account</button>
          </Link>
        </li>
        <li className="mx-3 opacity-80 py-[10px] hover:opacity-100">
          <Link to="/signin">
            <button className="movie-header">Sign In</button>
          </Link>
        </li>
        <li className="mx-3 opacity-80 py-[10px] hover:opacity-100">
          <button className="movie-header">Message Board</button>
        </li>
        <li className="mx-3 opacity-80 py-[10px] hover:opacity-100">
          <Link to="/bookmarks">
            <button className="movie-header">Bookmarks</button>
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default NavLinks;
