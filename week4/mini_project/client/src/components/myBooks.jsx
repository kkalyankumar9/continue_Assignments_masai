import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMyBooks,
  updateBookStatus,
  updateBookRating,
} from "../redux/books/myBooksSlice";

const MyBooks = () => {
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector((state) => state.myBooks);

  useEffect(() => {
    dispatch(fetchMyBooks());
  }, [dispatch]);

  const handleStatusChange = (bookId, status) => {
    dispatch(updateBookStatus({ bookId, status }));
  };

  const handleRatingChange = (bookId, rating) => {
    dispatch(updateBookRating({ bookId, rating }));
  };

  if (loading) return <p>Loading your books...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (books.length === 0) return <p>No books in your list yet 📚</p>;

  return (
    <div className="grid grid-cols-3 gap-6 p-6">
      {books.map((entry) => (
        <div
          key={entry._id}
          className="bg-white shadow-md rounded-xl p-4 flex flex-col items-center"
        >
          <img
            src={entry.bookId.coverImage}
            alt={entry.bookId.title}
            className="w-32 h-48 object-cover rounded-md"
          />
          <h2 className="text-lg font-semibold mt-2">{entry.bookId.title}</h2>
          <p className="text-gray-600">{entry.bookId.author}</p>

          {/* Status Dropdown */}
          <select
            value={entry.status}
            onChange={(e) => handleStatusChange(entry.bookId._id, e.target.value)}
            className="mt-2 border rounded p-1"
          >
          
            <option>Want to Read</option>
            <option>Reading</option>
            <option>Read</option>
          </select>

          {/* Rating */}
          <div className="flex mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => handleRatingChange(entry.bookId._id, star)}
                className={`cursor-pointer text-xl ${
                  star <= entry.rating ? "text-yellow-500" : "text-gray-400"
                }`}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyBooks;
