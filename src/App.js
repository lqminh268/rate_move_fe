import { useCallback, useEffect, useState } from "react";
import "./App.css";
import MovieDesription from "./components/movie-description";
import MovieList from "./components/movie-list";
import MovieForm from "./components/movie-form";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFetch } from "./hooks/useFetch";
function App() {
  const navigate = useNavigate();
  const [movies, setMovie] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [editMovie, setEditMovie] = useState(null);
  const [token, removeToken] = useCookies(["mr-token"]);

  // const movieClicked = useCallback((movie) => {
  //   setSelectedMovie(movie);
  // }, []);
  const [data] = useFetch(selectedMovie);

  const loadMovie = useCallback((movie) => {
    setSelectedMovie(movie);
    setEditMovie(null);
  }, []);

  const editClicked = useCallback((movie) => {
    setEditMovie(movie);
    setSelectedMovie(null);
  }, []);

  const logout = () => {
    removeToken("mr-token");
    navigate("/auth/");
  };

  const newMovie = () => {
    setEditMovie({
      title: "",
      description: "",
    });
    setSelectedMovie(null);
  };

  const createMovie = (movie) => {
    const newMovies = [...movies, movie];
    setMovie(newMovies);
  };

  const updateMovie = useCallback(
    (movie) => {
      const newMovie = movies.map((item, index) => {
        if (item.id === movie.id) {
          return movie;
        }
        return item;
      });
      setMovie(newMovie);
    },
    [movies]
  );

  const removeClicked = useCallback(
    (movie) => {
      const removeMovie = movies.filter((item) => movie.id !== item.id);
      setMovie(removeMovie);
      setSelectedMovie(null);
      setEditMovie(null);
    },
    [movies]
  );

  useEffect(() => {
    if (!token["mr-token"]) {
      navigate("/auth/");
    } else {
      setMovie(data)
    }
  }, [token, navigate, data]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Rater</h1>
        <FontAwesomeIcon icon={faSignOutAlt} onClick={logout} />
      </header>
      <div className="layout">
        <div>
          <MovieList
            movies={movies}
            movieClicked={loadMovie}
            editClicked={editClicked}
            removeClicked={removeClicked}
          />
          <button style={{ marginTop: 20 }} onClick={newMovie}>
            New Movie
          </button>
        </div>
        <MovieDesription movies={selectedMovie} updateMovie={loadMovie} />
        {editMovie ? (
          <MovieForm
            movies={editMovie}
            updateMovie={updateMovie}
            movieCreated={createMovie}
          />
        ) : null}
      </div>
    </div>
  );
}

export default App;
