export class API {
  static getMovie(token) {
    return fetch("http://127.0.0.1:8000/api/movies/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
      .then((resp) => resp.json())
  }

  static login(data) {
    return fetch(`http://127.0.0.1:8000/auth/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
  }

  static register(data) {
    return fetch(`http://127.0.0.1:8000/api/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
  }

  static updateMovie(movies, body, token) {
    return fetch(`http://127.0.0.1:8000/api/movies/${movies.id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token["mr-token"]}`,
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res) => res);
  }

  static createMovie(body, token) {
    return fetch(`http://127.0.0.1:8000/api/movies/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token["mr-token"]}`,
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res) => res);
  }

  static deleteMovie(movies, token) {
    return fetch(`http://127.0.0.1:8000/api/movies/${movies.id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token["mr-token"]}`,
      },
    }).then((res) => console.log("Done !!!"));
  }
}
