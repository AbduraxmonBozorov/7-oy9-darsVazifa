import React, { useEffect, useState } from "react";
import http from "../utils/axios";

function Features() {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    http
      .get("/movie?limit=20&page=5")
      .then((response) => {
        setFilms(response.data.docs);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleBookmark(id) {
    let filmsId = localStorage.getItem("filmsId");

    filmsId = filmsId ? JSON.parse(filmsId) : [];

    if (!Array.isArray(filmsId)) {
      filmsId = [];
    }

    if (!filmsId.includes(id)) {
      filmsId.push(id);
      localStorage.setItem("filmsId", JSON.stringify(filmsId));
      alert("Added to bookmark");
    } else {
      alert("Already in bookmark");
    }
  }

  return (
    <div className="mb-32 ml-9">
      <h2 className="w-78 text-3xl mt-10">Recommended for you</h2>
      <div className="container mx-auto max-w-[1280px] grid grid-cols-4 gap-12">
        {films.length > 0 ? (
          films.map((film, ind) => (
            <div key={film.id} className="cards relative mt-10 w-80 h-[200px]">
              <span
                className="absolute top-3 right-3 w-10 h-10 bg-gray-700 opacity-[50%] rounded-[50%] cursor-pointer z-10"
                onClick={() => handleBookmark(film.id)}
              >
                <i className="fa-regular fa-bookmark ml-[13px] mt-[12px] text-white cursor-pointer"></i>
              </span>
              <img
                src={film.poster?.url || "default-image.jpg"}
                alt={film.title || "Movie Poster"}
                className="rounded-xl w-full h-full object-cover"
              />
              <h3 className="text-white font-bold">{film.title}</h3>
            </div>
          ))
        ) : (
          <p>No films available at the moment.</p>
        )}
      </div>
    </div>
  );
}

export default Features;
