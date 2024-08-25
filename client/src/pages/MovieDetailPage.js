// src/pages/MovieDetailPage.js
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../context/UserContext"; // Import the useUser hook
import apiKey from "../config";

function MovieDetailPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const { user, token } = useUser(); // Get user and token from context
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
        );
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };
    fetchMovie();
  }, [id]);

  const handleBookmark = async () => {
    if (!user) {
      navigate("/signin"); // Redirect to sign-in if not logged in
      return;
    }
    try {
      await axios.post(
        "/api/bookmarks",
        { movieId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Use token from context
          },
        }
      );
      alert("Movie bookmarked successfully!");
    } catch (error) {
      console.error("Error bookmarking movie:", error.response?.data);
    }
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="p-8 flex">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-1/3 rounded-lg"
      />
      <div className="ml-8">
        <h1 className="text-4xl font-bold">{movie.title}</h1>
        <p className="text-lg my-4">{movie.overview}</p>
        <button
          onClick={handleBookmark}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Bookmark
        </button>
      </div>
    </div>
  );
}

export default MovieDetailPage;
