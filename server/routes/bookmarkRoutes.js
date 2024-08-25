const express = require("express");
const router = express.Router();
const {
  getBookmarks,
  addBookmark,
  removeBookmark,
} = require("../controllers/bookmarkController");
const authMiddleware = require("../middleware/authMiddleware");

// Apply the authentication middleware to all routes in this file
router.use(authMiddleware);

// Route to get all bookmarks for the authenticated user
router.get("/", getBookmarks);

// Route to add a new bookmark
router.post("/", addBookmark);

// Route to remove a bookmark by ID
router.delete("/:type/:id", removeBookmark);

module.exports = router;
