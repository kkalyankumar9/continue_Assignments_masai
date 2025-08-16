const express = require("express");
const { connection } = require("./db");
const { authRouter } = require("./routes/authRoute");
const cookieParser = require("cookie-parser");
const allBooksRouter = require("./routes/allBooks");
const cors = require("cors");
const { myBooksRouter } = require("./routes/myBooksRouter");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cookieParser()); // <-- required to read cookies

// ✅ CORS setup
const allowedOrigins = [
  "http://localhost:5173", // React dev
  "https://my-books-project.onrender.com" // (if frontend deployed here)
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, // allow cookies & auth headers
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to the Mini Project Server");
});

app.use("/api/auth", authRouter);
app.use("/api", allBooksRouter);
app.use("/api/mybooks", myBooksRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("✅ Connected to MongoDB");
    console.log(`🚀 Server running on port ${process.env.PORT}`);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
});
