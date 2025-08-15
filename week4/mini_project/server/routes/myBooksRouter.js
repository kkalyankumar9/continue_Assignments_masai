const express= require("express");
const { MyBooksModel } = require("../model/myBook");
const authMiddleware = require("../middleWare");
const myBooksRouter = express.Router();

myBooksRouter.use(authMiddleware);
myBooksRouter.get("/", async (req, res) => {
  try {
    const myBooks = await MyBooksModel.find({ userId: req.user.id })
      .populate("bookId", "title author coverImage availability");
    if (myBooks.length === 0) {
  return res.status(200).json({ message: "No books found", books: [] });
}
    res.status(200).json(myBooks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /api/mybooks/:bookId
 * Add a book to user's list
 */


myBooksRouter.post("/:bookId", authMiddleware, async (req, res) => {
  try {
    const { bookId } = req.params; // from URL
    const userId = req.user.id; // from auth middleware

    // Check if already exists
    const exists = await MyBooksModel.findOne({ userId, bookId });
    if (exists) {
      return res.status(400).json({ error: "Book already in your list" });
    }

    const newEntry = new MyBooksModel({ userId, bookId });
    const saved = await newEntry.save();

    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


/**
 * PATCH /api/mybooks/:bookId/status
 * Update reading status of a book
 */
myBooksRouter.patch("/:bookId/status", async (req, res) => {
  try {
    const { bookId } = req.params;
    const { status } = req.body;

    const updated = await MyBooksModel.findOneAndUpdate(
      { userId: req.user.id, bookId },
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Book not found in your list" });
    }

res.status(200).json({
  success: true,
  message: "Book status updated successfully",
  data: updated
});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * PATCH /api/mybooks/:bookId/rating
 * Update rating of a book
 */
myBooksRouter.patch("/:bookId/rating", async (req, res) => {
  try {
    const { bookId } = req.params;
    const { rating } = req.body;

    if (rating < 0 || rating > 5) {
      return res.status(400).json({ error: "Rating must be between 0 and 5" });
    }

    const updated = await MyBooksModel.findOneAndUpdate(
      { userId: req.user.id, bookId },
      { rating },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Book not found in your list" });
    }

  res.status(200).json({
  success: true,
  message: "Book rating updated successfully",
  data: updated
});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




module.exports = {myBooksRouter};
