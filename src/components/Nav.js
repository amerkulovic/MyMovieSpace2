const Nav = (props) => {
  return (
    <div className="bg-gradient-to-r from-black via-red-700 to-black flex items-center justify-between py-4">
      <div className="mx-2">
        <input placeholder="Find a Movie!" onChange={props.value} />
        <button onClick={props.search}>Search</button>
      </div>
      <h1 className="header-font text-white text-6xl">MyMovieSpace</h1>
      <section>
        <ul className="flex flex-row mr-2">
          <li className="mx-1">
            <button>Bookmark</button>
          </li>
          <li className="mx-1">
            <button>Personal</button>
          </li>
          <li className="mx-1">
            <button>Login</button>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Nav;
