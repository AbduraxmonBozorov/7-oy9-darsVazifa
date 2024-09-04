import React, { useEffect, useState } from "react";
import http from "../utils/axios";

function Features() {
  const [films, setFilms] = useState([]);
  console.log(films);
  

  useEffect(() => {
    http
      .get("/movie?limit=20&page=5")
      .then((response) => {
        // console.log(response);
        setFilms(response.data.docs);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleBookmark(id){
    console.log(id);
    let filmsId=localStorage.getItem("filmsId") ? JSON.parse(localStorage.getItem("filmsId")) : []
    alert("Add to bookmark")
  }

  return (
    <div className="mb-32 ml-9">
      <h2 className="w-78 text-3xl mt-10">Recommended for you</h2>
      <div className="container mx-auto max-w-[1280px] grid grid-cols-4 gap-12">
        {
          films.length > 0 && films.map(function(film, ind){
            return <div key={ind} className="cards relative mt-10  w-80 h-[200px]">
            <span className="absolute top-3 right-3  w-10 h-10 bg-gray-700 opacity-[50%] rounded-[50%] cursor-pointer z-10" onClick={()=>{handleBookmark(film.id)}}>
              <i className="fa-regular fa-bookmark ml-[13px] mt-[12px] text-white cursor-pointer" ></i>
            </span>
            <img
              src={film.poster?.url || 'default-image.jpg'}
              alt=""
              className="rounded-xl w-full"
            />
            <h3 className="text-white font-bold">2019 Movie PG</h3>
            <h3 className="text-white font-bold">The Great Lands</h3>
          </div>
          })
        }
      </div>
    </div>
  );
}

export default Features;
