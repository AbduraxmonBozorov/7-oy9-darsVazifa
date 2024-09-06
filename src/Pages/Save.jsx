import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Nav from "../components/Nav";
import http from "../utils/axios";

const Save = () => {
  const [filmsId, setFilmsId] = useState(
    localStorage.getItem("filmsId")
      ? JSON.parse(localStorage.getItem("filmsId"))
      : []
  );
  const [films, setFilms] = useState([]);

  useEffect(() => {
    
    if (filmsId.length > 0) {
      Promise.all(
        filmsId.map((id) => http.get(`/movie/${id}`).then((resp) => resp.data))
      )
        .then((movies) => {
          console.log(movies);
          
          setFilms(movies);
        })
        .catch((error) => {
          console.log("Error fetching movies:", error);
        });
    }
  }, [filmsId]);

  return (
    <div className="flex container mx-auto">
      <div>
        <Nav />
      </div>
      <div>
        <Header />
        <div className="container flex flex-row justify-between gap-20">
          {films.length > 0 &&
            films.map((film, ind) => (
              <div key={ind}>
                <img
                  src={film.poster.url}
                  className="w-full h-64"
                  alt={film.title || "Movie"}
                />
                <p>{film.name}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Save;
