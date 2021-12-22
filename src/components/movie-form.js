import React, { useEffect, useState, memo, useCallback } from "react";
import { API } from "../api_service";
import { useCookies } from "react-cookie";

function MovieForm(props) {
  const [form, setForm] = useState({
    title: props.movies.title,
    description: props.movies.description,
  });
  const [token] = useCookies(["mr-token"]);
  
  const handleChange = useCallback(
    (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    },
    [form]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (props.movies.id) {
      API.updateMovie(props.movies, form, token).then((res) => props.updateMovie(res));
    } else {
      API.createMovie(form, token).then((res) => props.movieCreated(res));
    }
  };

  useEffect(() => {
    setForm({
      title: props.movies.title,
      description: props.movies.description,
    });
  }, [props.movies]);

  return (
    <>
      {props.movies ? (
        <form style={{ textAlign: "center" }} onSubmit={handleSubmit}>
          <h2>{props.movies.id ? "Edit" : "Create"}</h2>
          <label htmlFor="title">Title</label>
          <br />
          <input
            id="title"
            type="text"
            placeholder="title"
            name="title"
            value={form.title}
            onChange={handleChange}
          />{" "}
          <br />
          <label htmlFor="description">Desription</label>
          <br />
          <textarea
            id="description"
            type="text"
            placeholder="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
          ></textarea>
          <br />
          {props.movies.id ? (
            <button type="submit">Edit</button>
          ) : (
            <button type="submit">Create</button>
          )}
        </form>
      ) : null}
    </>
  );
}

export default memo(MovieForm);
