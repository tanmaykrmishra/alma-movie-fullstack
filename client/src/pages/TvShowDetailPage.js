import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../context/UserContext"; // Import the useUser hook
import apiKey from "../config";

function TvShowDetailPage() {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const { user, token } = useUser(); // Get user and token from context
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShow = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}`
        );
        setShow(response.data);
      } catch (error) {
        console.error("Error fetching TV show:", error);
      }
    };
    fetchShow();
  }, [id]);

  const handleBookmark = async () => {
    if (!user) {
      navigate("/signin"); // Redirect to sign-in if not logged in
      return;
    }
    try {
      await axios.post(
        "https://alma-movie-fullstack.onrender.com/api/bookmarks",
        { tvShowId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Use token from context
          },
        }
      );
      alert("TV show bookmarked successfully!");
    } catch (error) {
      console.error("Error bookmarking TV show:", error.response?.data);
    }
  };

  if (!show) return <div>Loading...</div>;

  return (
    <div className="p-8 flex">
      <img
        src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
        alt={show.name}
        className="w-1/3 rounded-lg"
      />
      <div className="ml-8">
        <h1 className="text-4xl font-bold">{show.name}</h1>
        <p className="text-lg my-4">{show.overview}</p>
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

export default TvShowDetailPage;
