import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext"; // Import the useUser hook
import apiKey from "../config";
function BookmarksPage() {
  const [movieDetails, setMovieDetails] = useState([]);
  const [tvShowDetails, setTvShowDetails] = useState([]);
  const { user, token } = useUser(); // Get user and token from context
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/signin"); // Redirect to sign-in if not logged in
      return;
    }

    const fetchBookmarks = async () => {
      try {
        const response = await axios.get(
          "https://alma-movie-fullstack-backend.onrender.com/api/bookmarks",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Extract the IDs from the response
        const movieIds = response.data.movieBookmarks;
        const tvShowIds = response.data.tvShowBookmarks;

        // Fetch details for each movie ID
        const fetchMovieDetails = movieIds.map(async (id) => {
          const res = await axios.get(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
          );
          return res.data; // Return the full movie data
        });

        // Fetch details for each TV show ID
        const fetchTvShowDetails = tvShowIds.map(async (id) => {
          const res = await axios.get(
            `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}`
          );
          return res.data; // Return the full TV show data
        });

        // Wait for all the API calls to complete
        const movies = await Promise.all(fetchMovieDetails);
        const tvShows = await Promise.all(fetchTvShowDetails);

        // Update the state with the fetched data
        setMovieDetails(movies);
        setTvShowDetails(tvShows);
      } catch (err) {
        console.error("Error fetching bookmarks:", err);
      }
    };

    fetchBookmarks();
  }, [user, token, navigate]);

  // Handle delete bookmark
  const handleDeleteBookmark = async (type, id) => {
    try {
      await axios.delete(
        `https://alma-movie-fullstack-backend.onrender.com/api/bookmarks/${type}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Remove the item from the state
      if (type === "movie") {
        setMovieDetails((prevDetails) =>
          prevDetails.filter((item) => item.id !== id)
        );
      } else if (type === "tvShow") {
        setTvShowDetails((prevDetails) =>
          prevDetails.filter((item) => item.id !== id)
        );
      }
    } catch (err) {
      console.error("Error deleting bookmark:", err);
    }
  };

  if (!user) {
    return <div>Please log in to view your bookmarks.</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Your Bookmarks</h1>

      <h2 className="text-2xl font-semibold mb-4">Movies</h2>
      {movieDetails.length === 0 ? (
        <p>No movie bookmarks found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {movieDetails.map((item) => (
            <div
              key={item.id}
              className="bg-gray-800 text-white rounded-lg overflow-hidden shadow-md relative"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.title}
                className="w-full h-64 object-cover"
                onClick={() => navigate(`/movie/${item.id}`)}
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-sm mt-2">{item.overview}</p>
              </div>
              <button
                onClick={() => handleDeleteBookmark("movie", item.id)}
                className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2 hover:bg-red-800"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      <h2 className="text-2xl font-semibold mb-4">TV Shows</h2>
      {tvShowDetails.length === 0 ? (
        <p>No TV show bookmarks found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {tvShowDetails.map((item) => (
            <div
              key={item.id}
              className="bg-gray-800 text-white rounded-lg overflow-hidden shadow-md relative"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.name}
                className="w-full h-64 object-cover"
                onClick={() => navigate(`/tv/${item.id}`)}
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-sm mt-2">{item.overview}</p>
              </div>
              <button
                onClick={() => handleDeleteBookmark("tvShow", item.id)}
                className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2 hover:bg-red-800"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookmarksPage;
