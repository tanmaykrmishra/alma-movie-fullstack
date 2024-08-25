import { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import TvShowCard from "../components/TvShowCard";
import apiKey from "../config";

function HomePage() {
  const [searchType, setSearchType] = useState("movie");
  const [searchTerm, setSearchTerm] = useState("");
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTvShows, setTrendingTvShows] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    // Fetch trending movies and TV shows
    const fetchTrending = async () => {
      const movieResponse = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`
      );
      const tvResponse = await axios.get(
        `https://api.themoviedb.org/3/trending/tv/week?api_key=${apiKey}`
      );
      setTrendingMovies(movieResponse.data.results.slice(0, 10));
      setTrendingTvShows(tvResponse.data.results.slice(0, 10));
    };
    fetchTrending();
  }, []);

  useEffect(() => {
    // Fetch search results as the user types
    const fetchSearchResults = async () => {
      if (!searchTerm) {
        setSearchResults([]);
        return;
      }
      setIsSearching(true);
      try {
        let response;
        if (searchType === "movie") {
          response = await axios.get(
            `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`
          );
        } else {
          response = await axios.get(
            `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${searchTerm}`
          );
        }
        setSearchResults(response.data.results);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setIsSearching(false);
      }
    };

    const debounceFetch = setTimeout(fetchSearchResults, 300); // Debounce to limit API calls

    return () => clearTimeout(debounceFetch);
  }, [searchTerm, searchType]);

  return (
    <div className="p-4">
      <div className="flex mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={`Search for a ${searchType}`}
          className="border p-2 mr-2 w-[300px]"
        />
        <div className="flex items-center">
          <input
            type="radio"
            id="movie"
            name="searchType"
            value="movie"
            checked={searchType === "movie"}
            onChange={() => setSearchType("movie")}
          />
          <label htmlFor="movie" className="mx-2">
            Movie
          </label>
          <input
            type="radio"
            id="tvshow"
            name="searchType"
            value="tv"
            checked={searchType === "tv"}
            onChange={() => setSearchType("tv")}
          />
          <label htmlFor="tvshow" className="mx-2">
            TV Show
          </label>
        </div>
      </div>

      {searchTerm ? (
        isSearching ? (
          <p className="text-blue-500">Searching...</p>
        ) : searchResults.length > 0 ? (
          <>
            <h2 className="text-2xl font-bold mb-4">
              Search Results for{" "}
              {searchType === "movie" ? "Movies" : "TV Shows"}
            </h2>
            <div className="grid grid-cols-5 gap-4">
              {searchType === "movie"
                ? searchResults.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))
                : searchResults.map((show) => (
                    <TvShowCard key={show.id} show={show} />
                  ))}
            </div>
          </>
        ) : (
          <p className="text-red-500">No matching results found.</p>
        )
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4">Trending Movies</h2>
          <div className="grid grid-cols-5 gap-4">
            {trendingMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Trending TV Shows</h2>
          <div className="grid grid-cols-5 gap-4">
            {trendingTvShows.map((show) => (
              <TvShowCard key={show.id} show={show} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default HomePage;
