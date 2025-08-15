// models/Book.js
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  coverImage: String,
  availability: Boolean,
});


const BooksModel = mongoose.model("Books", bookSchema);

module.exports = { BooksModel };