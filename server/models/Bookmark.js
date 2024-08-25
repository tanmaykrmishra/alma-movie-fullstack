const mongoose = require("mongoose");

const BookmarkSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  movieBookmarks: [{ type: Number }], // Only storing movie IDs
  tvShowBookmarks: [{ type: Number }], // Only storing TV show IDs
});

module.exports = mongoose.model("Bookmark", BookmarkSchema);
