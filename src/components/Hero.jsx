import React, { useEffect, useState } from "react";
import http from "../utils/axios";
function Hero() {
  const [trending, setTrending] = useState([]);
  useEffect(() => {
    http
      .get("/image", {
        headers: {
          "x-api-key": "W3HQA07-RERMRQW-G7EJT3Q-2ZW7HG4",
        },
      })
      .then((data) => {
        // console.log(data);
        setTrending(data.data.docs);
        console.log(trending);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="container flex flex-col gap-6">
      <h2 className="mt-[34px] ml-9 w-[122px] h-10 font-normal text-3xl ">
        Trending
      </h2>

      <div className="carousel rounded-box">
        {trending.length &&
          trending.map((film, ind) => (
            <div key={ind} className="carousel-item border border-white me-3 w-1/3 rounded-lg">
              <img
                src={film.url}
                className="w-full rounded-lg"
                alt=""
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default Hero;
