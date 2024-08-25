const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const bookmarkRoutes = require("./routes/bookmarkRoutes");

dotenv.config();
connectDB();

const app = express();

// Configure CORS
app.use(
  cors({
    origin: "https://tanmay-almabetter-movie-database.netlify.app/", // Replace with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific HTTP methods
    credentials: true, // Allow cookies to be sent
    allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
  })
);

// Ensure OPTIONS preflight requests are handled
app.options("*", cors());

// Middleware for parsing JSON bodies
app.use(express.json());

// Define API routes
app.use("/api/auth", authRoutes);
app.use("/api/bookmarks", bookmarkRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
