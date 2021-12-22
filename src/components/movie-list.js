import React, { memo } from "react";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { API } from "../api_service";
import { useCookies } from "react-cookie";

function MovieList(props) {
  const { movies } = props;
  const [token] = useCookies(["mr-token"]);

  const editClicked = (movie) => {
    props.editClicked(movie);
  };

  const deleteClick = (movie) => {
    API.deleteMovie(movie, token).then(() => props.removeClicked(movie))
  };

  return (
    <div>
      Movie List
      {movies &&
        movies.map((movie) => {
          return (
            <div key={movie.id}>
              <h2 onClick={() => props.movieClicked(movie)} key={movie.id}>
                {movie.title}
              </h2>
              <FontAwesomeIcon
                style={{ marginRight: 10 }}
                icon={faEdit}
                onClick={() => editClicked(movie)}
              />
              <FontAwesomeIcon
                icon={faTrash}
                onClick={() => deleteClick(movie)}
              />
            </div>
          );
        })}
    </div>
  );
}

export default memo(MovieList);
