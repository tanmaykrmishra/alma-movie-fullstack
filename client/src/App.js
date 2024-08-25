import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import MoviesPage from "./pages/MoviesPage";
import TvShowsPage from "./pages/TvShowsPage";
import BookmarksPage from "./pages/BookmarksPage";
import MovieDetailPage from "./pages/MovieDetailPage";
import TvShowDetailPage from "./pages/TvShowDetailPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import Header from "./components/Header";
import { useUser } from "./context/UserContext"; // Import the useUser hook

function App() {
  const { user, logout } = useUser(); // Use UserContext to get user and logout

  return (
    <Router>
      <Header user={user} logout={logout} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/tvshows" element={<TvShowsPage />} />
        <Route
          path="/bookmarks"
          element={user ? <BookmarksPage /> : <Navigate to="/signin" />}
        />
        <Route path="/movies/:id" element={<MovieDetailPage />} />
        <Route path="/tvshows/:id" element={<TvShowDetailPage />} />
        <Route
          path="/signin"
          element={user ? <Navigate to="/" /> : <SignInPage />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <SignUpPage />}
        />
      </Routes>
    </Router>
  );
}

export default App;
