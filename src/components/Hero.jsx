import React, { useEffect, useState } from "react";
import http from "../utils/axios";

function Hero() {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    http
      .get("/movie")
      .then((response) => {
        setTrending(response.data.docs);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container flex flex-col gap-6">
      <h2 className="mt-[34px] ml-9 w-[122px] h-10 font-normal text-3xl">
        Trending
      </h2>

      <div className="carousel rounded-box">
        {trending.length > 0 ? (
          trending.map((film, ind) => (
            <div
              key={ind}
              className="carousel-item border border-white me-3 w-1/3 rounded-lg"
            >
              <div className="relative">
                <img
                  src={film.backdrop?.url || "/default-image.jpg"}
                  className="w-full h-64 rounded-lg"
                  alt={film.name}
                />
                <div>
                  <p className=" absolute bottom-0 p-5">{film.name}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No trending movies available.</p>
        )}
      </div>
    </div>
  );
}

export default Hero;
