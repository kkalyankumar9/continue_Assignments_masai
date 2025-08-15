// models/Book.js
const mongoose = require("mongoose");

const myBooksSchema = new mongoose.Schema({
  userId: {
    type: String, // store as plain string
    required: true
  },
  bookId: {
    type: String, // store as plain string
    required: true
  },
  status: {
    type: String,
    enum: ["Want to Read", "Reading", "Read"],
    default: "Want to Read"
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  }
}, { timestamps: true });

const MyBooksModel = mongoose.model("myBooks", myBooksSchema);

module.exports = { MyBooksModel };
