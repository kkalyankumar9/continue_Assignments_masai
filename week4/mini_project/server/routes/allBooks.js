const express = require("express");
const axios = require("axios");
const authMiddleware = require("../middleWare");
const { BooksModel } = require("../model/books");

const allBooksRouter = express.Router();

allBooksRouter.get("/books", authMiddleware, async (req, res) => {
  try {
    // Fetch 20 books by Indian authors from Open Library
    const apiRes = await axios.get(
      "https://openlibrary.org/search.json?author=Arundhati+Roy&limit=200"
    );

    const books = apiRes.data.docs.map((doc) => ({
      title: doc.title,
      author: doc.author_name ? doc.author_name.join(", ") : "Unknown",
      coverImage: doc.cover_edition_key
        ? `https://covers.openlibrary.org/b/olid/${doc.cover_edition_key}-M.jpg`
        : null,
      availability: Math.random() < 0.7, // random availability
    }));

    // Insert books into MongoDB
    const insertedBooks = await BooksModel.insertMany(books);

    // Return inserted books as response
    res.status(200).json(insertedBooks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch or save books" });
  }
});

module.exports = allBooksRouter;
