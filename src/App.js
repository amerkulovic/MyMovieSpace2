import Nav from "./components/Nav";
import { useState } from "react";

function App() {
  let [movie, setMovie] = useState(null);

  const searchHandler = async () => {
    await fetch(`http://www.omdbapi.com/?t=batman&apikey=f14ca85d
  `)
      .then((response) => response.json())
      .then((data) => {
        setMovie(data);
        console.log(movie);
      });
  };

  return (
    <>
      <Nav search={searchHandler} value={(event) => event.target.value} />
    </>
  );
}

export default App;
