import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  return (
    <Link to={`/movies/${movie.id}`} className="bg-gray-800 p-4 rounded-lg">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="rounded-lg mb-2"
      />
      <h3 className="text-lg font-bold">{movie.title}</h3>
      <p className="text-sm text-gray-400">
        {movie.overview.substring(0, 80)}...
      </p>
    </Link>
  );
}

export default MovieCard;
