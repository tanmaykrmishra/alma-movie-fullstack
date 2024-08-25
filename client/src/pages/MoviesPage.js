import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import apiKey from "../config";
function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/movie/popular",
          {
            params: {
              api_key: apiKey,
            },
          }
        );
        setMovies(response.data.results);
      } catch (err) {
        console.error("Error fetching popular movies:", err);
      }
    };

    fetchPopularMovies();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Popular Movies</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-gray-800 text-white rounded-lg overflow-hidden shadow-md cursor-pointer"
            onClick={() => navigate(`/movies/${movie.id}`)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{movie.title}</h2>
              <p className="text-sm mt-2">{movie.overview}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MoviesPage;
