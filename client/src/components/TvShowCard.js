import { Link } from "react-router-dom";

function TvShowCard({ show }) {
  return (
    <Link to={`/tvshows/${show.id}`} className="bg-gray-800 p-4 rounded-lg">
      <img
        src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
        alt={show.name}
        className="rounded-lg mb-2"
      />
      <h3 className="text-lg font-bold">{show.name}</h3>
      <p className="text-sm text-gray-400">
        {show.overview.substring(0, 80)}...
      </p>
    </Link>
  );
}

export default TvShowCard;
