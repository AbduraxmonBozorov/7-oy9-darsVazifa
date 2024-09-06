import React, { useContext, useState, useEffect } from "react";
import { FaSearch, FaMoon, FaSun } from "react-icons/fa";
import { ThemeContext } from "../context/ThemeContext";
import useDebounce from "../customHooks/useDebounce"; 
import http from "../utils/axios";

function Header() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]); 

  const debouncedSearchTerm = useDebounce(searchTerm, 500); 

  useEffect(() => {
    if (debouncedSearchTerm) {
      http
        .get(`/movie/search?query=${debouncedSearchTerm}`)
        .then((response) => {
          setSearchResults(response.data.docs);
        })
        .catch((error) => {
          console.log("Error fetching search results:", error);
        });
    } else {
      setSearchResults([]); 
    }
  }, [debouncedSearchTerm]);

  return (
    <div className="w-full max-w-xs ml-9 bg-white mt-6 dark:bg-[#10141E] rounded">
      <div className="relative flex items-center">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
        <input
          type="text"
          placeholder="Type here"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full pl-10 bg-gray-100 text-gray-800 dark:bg-[#10141E] dark:text-white outline-none"
        />
        <button
          onClick={toggleTheme}
          className="ml-4 p-2 rounded-full text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100"
        >
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>

      {searchResults.length > 0 && (
        <div className="bg-white dark:bg-[#10141E] mt-2 rounded-lg shadow-md">
          {searchResults.map((result) => (
            <div key={result.id} className="p-2 border-b border-gray-200 dark:border-gray-700">
              <p className="text-gray-800 dark:text-white">{result.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Header;
