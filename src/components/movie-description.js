import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { memo, useState, useCallback } from "react";
import { useCookies } from "react-cookie";

function MovieDesription(props) {
  let { movies } = props;
  const [highlighted, setHighlighted] = useState(-1);

  const [token] = useCookies(["mr-token"]);

  const highlight = useCallback(
    (high) => () => {
      setHighlighted(high);
    },
    []
  );

  const rateClick = (stars) => () => {
    fetch(`http://127.0.0.1:8000/api/movies/${movies.id}/rate_movie/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token["mr-token"]}`,
      },
      body: JSON.stringify({
        stars: stars + 1,
      }),
    })
      .then(() => getDetail())
      .catch((err) => console.log(err));
  };

  const getDetail = () => {
    fetch(`http://127.0.0.1:8000/api/movies/${movies.id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token["mr-token"]}`,
      },
    })
      .then((resp) => resp.json())
      .then((resp) => props.updateMovie(resp))
      .catch((err) => console.log(err));
  };

  return (
    <>
      {movies ? (
        <div>
          <div>Movie Detail</div>
          <h1>{movies ? movies.title : "Not Select Movie Yet"}</h1>
          <p>{movies ? movies.description : ""}</p>
          <FontAwesomeIcon
            className={movies.avg_rating > 0 ? "yellow" : ""}
            icon={faStar}
          />
          <FontAwesomeIcon
            className={movies.avg_rating > 1 ? "yellow" : ""}
            icon={faStar}
          />
          <FontAwesomeIcon
            className={movies.avg_rating > 2 ? "yellow" : ""}
            icon={faStar}
          />
          <FontAwesomeIcon
            className={movies.avg_rating > 3 ? "yellow" : ""}
            icon={faStar}
          />
          <FontAwesomeIcon
            className={movies.avg_rating > 4 ? "yellow" : ""}
            icon={faStar}
          />
          ({movies.no_of_ratings})
          <div className="rate-container">
            <h2>Rate it !!!</h2>
            {[...Array(5)].map((item, index) => (
              <FontAwesomeIcon
                key={index}
                className={highlighted > index - 1 ? "yellow" : ""}
                onMouseEnter={highlight(index)}
                onMouseLeave={highlight(-1)}
                onClick={rateClick(index)}
                icon={faStar}
              />
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}
export default memo(MovieDesription);
