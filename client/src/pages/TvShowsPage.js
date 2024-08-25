import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import apiKey from "../config";

function TvShowsPage() {
  const [tvShows, setTvShows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPopularTvShows = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/tv/popular",
          {
            params: {
              api_key: apiKey,
            },
          }
        );
        setTvShows(response.data.results);
      } catch (err) {
        console.error("Error fetching popular TV shows:", err);
      }
    };

    fetchPopularTvShows();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Popular TV Shows</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {tvShows.map((show) => (
          <div
            key={show.id}
            className="bg-gray-800 text-white rounded-lg overflow-hidden shadow-md cursor-pointer"
            onClick={() => navigate(`/tvshows/${show.id}`)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
              alt={show.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{show.name}</h2>
              <p className="text-sm mt-2">{show.overview}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TvShowsPage;
