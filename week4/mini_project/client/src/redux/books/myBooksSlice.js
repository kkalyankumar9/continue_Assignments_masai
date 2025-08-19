// src/redux/books/myBooksSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch my books
export const fetchMyBooks = createAsyncThunk(
  "myBooks/fetchMyBooks",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("https://my-books-project.onrender.com/api/mybooks/", {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Update book status
export const updateBookStatus = createAsyncThunk(
  "myBooks/updateBookStatus",
  async ({ bookId, status }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(
        `https://my-books-project.onrender.com/api/mybooks/${bookId}/status`,
        { status },
        { withCredentials: true }
      );
      return res.data.data; // backend sends updated entry in `data`
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

// Update book rating
export const updateBookRating = createAsyncThunk(
  "myBooks/updateBookRating",
  async ({ bookId, rating }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(
        `https://my-books-project.onrender.com/api/mybooks/${bookId}/rating`,
        { rating },
        { withCredentials: true }
      );
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

const myBooksSlice = createSlice({
  name: "myBooks",
  initialState: {
    books: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchMyBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(fetchMyBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // status update
      .addCase(updateBookStatus.fulfilled, (state, action) => {
        const idx = state.books.findIndex(
          (b) => b.bookId._id === action.payload.bookId
        );
        if (idx !== -1) state.books[idx].status = action.payload.status;
      })
      // rating update
      .addCase(updateBookRating.fulfilled, (state, action) => {
        const idx = state.books.findIndex(
          (b) => b.bookId._id === action.payload.bookId
        );
        if (idx !== -1) state.books[idx].rating = action.payload.rating;
      });
  },
});

export default myBooksSlice.reducer;
