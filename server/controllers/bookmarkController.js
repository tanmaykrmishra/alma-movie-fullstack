const Bookmark = require("../models/Bookmark");

exports.addBookmark = async (req, res) => {
  const { movieId, tvShowId } = req.body;

  try {
    let bookmark = await Bookmark.findOne({ userId: req.user.id });

    if (!bookmark) {
      // Create a new bookmark document if it does not exist
      bookmark = new Bookmark({
        userId: req.user.id,
        movieBookmarks: movieId ? [movieId] : [],
        tvShowBookmarks: tvShowId ? [tvShowId] : [],
      });

      await bookmark.save();
      return res.json(bookmark);
    }

    // Update existing bookmark document
    if (movieId && !bookmark.movieBookmarks.includes(movieId)) {
      bookmark.movieBookmarks.push(movieId);
    }

    if (tvShowId && !bookmark.tvShowBookmarks.includes(tvShowId)) {
      bookmark.tvShowBookmarks.push(tvShowId);
    }

    await bookmark.save();
    res.json(bookmark);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.removeBookmark = async (req, res) => {
  const { id, type } = req.params; // Assume `type` is 'movie' or 'tvShow'

  try {
    const bookmark = await Bookmark.findOne({ userId: req.user.id });

    if (!bookmark) {
      return res.status(404).json({ message: "No bookmarks found" });
    }

    if (type === "movie") {
      bookmark.movieBookmarks = bookmark.movieBookmarks.filter(
        (b) => b !== parseInt(id)
      );
    } else if (type === "tvShow") {
      bookmark.tvShowBookmarks = bookmark.tvShowBookmarks.filter(
        (b) => b !== parseInt(id)
      );
    } else {
      return res.status(400).json({ message: "Invalid type" });
    }

    await bookmark.save();
    res.json({ message: "Bookmark removed" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getBookmarks = async (req, res) => {
  try {
    // Find the bookmark document for the authenticated user
    const bookmark = await Bookmark.findOne({ userId: req.user.id });

    if (!bookmark) {
      // If no bookmarks found for the user, return an empty object
      return res.json({
        movieBookmarks: [],
        tvShowBookmarks: [],
      });
    }

    // Return the bookmarks found
    res.json(bookmark);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
