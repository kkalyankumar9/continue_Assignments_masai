import React, { useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../redux/books/allBooksSlice";
import axios from "axios";
import { useState } from "react";

const Books = () => {
  const dispatch = useDispatch();
  const { books, loading, error, hasMore, page } = useSelector(
    (state) => state.books
  );
  const observer = useRef();
const [addedBooks, setAddedBooks] = useState([]);
  // Load more books when last element is visible
  const lastBookRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          dispatch(fetchBooks({ page: page + 1, limit: 10 }));
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, page, dispatch]
  );

  useEffect(() => {
    dispatch(fetchBooks({ page: 1, limit: 10 })); // initial fetch
  }, [dispatch]);

  const handleAddBook = async (bookId) => {
    try {
        const res = await axios.post(
        `https://my-books-project.onrender.com/api/mybooks/${bookId}`,
        {},
        { withCredentials: true }
      );

      setAddedBooks((prev) => [...prev, bookId]); // mark as added
      console.log("✅ Added:", res.data);
    } catch (err) {
      alert(err.response?.data?.error || "Failed to add book ❌");
    }
  };

  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6">
      {books.map((book, idx) => {
        if (books.length === idx + 1) {
          // last book
          return (
            <div
              ref={lastBookRef}
              key={book._id}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center"
            >
              {book.coverImage ? (
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-32 h-48 object-cover mb-3 rounded"
                />
              ) : (
                <div className="w-32 h-48 bg-gray-300 flex items-center justify-center mb-3 rounded">
                  <span>No Image</span>
                </div>
              )}
              <h3 className="text-lg font-bold text-gray-800">{book.title}</h3>
              <p className="text-sm text-gray-600">by {book.author}</p>
              <p
                className={`mt-2 text-sm font-semibold ${
                  book.availability ? "text-green-600" : "text-red-600"
                }`}
              >
                {book.availability ? "Available" : "Not Available"}
              </p>
              <button
                onClick={() => handleAddBook(book._id)}
                className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Add book
              </button>
            </div>
          );
        } else {
          return (
            <div
              key={book._id}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center"
            >
              {book.coverImage ? (
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-32 h-48 object-cover mb-3 rounded"
                />
              ) : (
                <div className="w-32 h-48 bg-gray-300 flex items-center justify-center mb-3 rounded">
                  <span>No Image</span>
                </div>
              )}
              <h3 className="text-lg font-bold text-gray-800">{book.title}</h3>
              <p className="text-sm text-gray-600">by {book.author}</p>
              <p
                className={`mt-2 text-sm font-semibold ${
                  book.availability ? "text-green-600" : "text-red-600"
                }`}
              >
                {book.availability ? "Available" : "Not Available"}
              </p>
              <button
                onClick={() => handleAddBook(book._id)}
                className="mt-3 px-4 py-2 bg-blue-500  rounded-lg hover:bg-blue-600"
              >
                Add book
              </button>
            </div>
          );
        }
      })}
      {loading && (
        <p className="text-center text-blue-500 col-span-full">Loading...</p>
      )}
    </div>
  );
};

export default Books;
