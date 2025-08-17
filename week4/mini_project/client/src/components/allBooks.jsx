import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../redux/books/allBooksSlice";
import axios from "axios";


const Books = () => {
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  if (loading) return <p className="text-center text-blue-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  const handleAddBook = async (bookId) => {
    
    try {
      const res = await axios.post(
        `https://my-books-project.onrender.com/api/mybooks/${bookId}`,
        {},
        { withCredentials: true } // important for cookies/auth
      );
      alert("Book added to your list ✅");
      console.log(res.data);
    } catch (err) {
      alert(err.response?.data?.error || "Failed to add book ❌");
    }
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6">
      {books.map((book, idx) => (
        <div
          key={idx}
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
      ))}
    </div>
  );
};

export default Books;
