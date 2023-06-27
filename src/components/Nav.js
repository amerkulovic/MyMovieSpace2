import search from "./../svgs/search.svg";
import bookmark from "./../svgs/bookmark.svg";
import login from "./../svgs/right-to-bracket-solid.svg";
import { Link } from "react-router-dom";

const Nav = (props) => {
  return (
    <div className="bg-gradient-to-r from-black via-red-700 to-black flex items-center justify-between py-4">
      <div className="ml-4 flex items-center">
        <input className="h-14 px-4 rounded-tl-xl rounded-bl-xl" placeholder="Find a Movie!" onChange={props.value} />
        <Link to="/">
          <button className="bg-white p-4 h-14 rounded-tr-xl rounded-br-xl" onClick={props.search}>
            <img className="h-5 w-5" src={search} />
          </button>
        </Link>
      </div>
      <h1 className="header-font text-white text-6xl">MyMovieSpace</h1>
      <section>
        <ul className="flex flex-row mr-2">
          <li className="mx-1">
            <button>
              <img className="h-10 w-10" src={bookmark} />
            </button>
          </li>
          <li className="mx-1">
            <button>
              <img className="h-10 w-10" src={login} />
            </button>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Nav;
