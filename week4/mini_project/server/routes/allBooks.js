const express = require("express");
const axios = require("axios");

const { BooksModel } = require("../model/books");

const allBooksRouter = express.Router();

allBooksRouter.get("/books", async (req, res) => {
  try {
    const books = await BooksModel.find(); // fetch directly from DB
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

module.exports = allBooksRouter;
