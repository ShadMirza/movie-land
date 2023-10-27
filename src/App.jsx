import { useState, useEffect } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";

const API_URL = "http://www.omdbapi.com/?apikey=ea4c72ad";

function App() {
  const [movies, setMovies] = useState([]);
  const [serachTerm, setSearchTerm] = useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          type="text"
          placeholder="Search for movies"
          value={serachTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
          }
        }
        onKeyDown={(e)=>{
          if (e.key === 'Enter') {
            searchMovies(serachTerm);
          }
        }}  
        />
        <img src={SearchIcon} alt="Search" onClick={() => {
          searchMovies(serachTerm)
        }} />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies &&
            movies.map((movie, index) => (
              <MovieCard key={index} movie={movie} />
            ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found !</h2>
        </div>
      )}
    </div>
  );
}

export default App;
