// src/redux/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Axios default config: send cookies automatically
axios.defaults.withCredentials = true;

// ===========================
// Async Thunks
// ===========================

// Register a new user
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "https://my-books-project.onrender.com/api/auth/register",
        { email, password }
      );
      return data; // { msg: "Registration successful" }
    } catch (err) {
      return rejectWithValue(err.response?.data?.msg || "Registration failed");
    }
  }
);

// Login user
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "https://my-books-project.onrender.com/api/auth/login",
        { email, password }
      );
      return data; // { user: {...}, msg: "Login successful" }
    } catch (err) {
      return rejectWithValue(err.response?.data?.msg || "Login failed");
    }
  }
);

// Logout user
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        "https://my-books-project.onrender.com/api/auth/logout"
      );
      return data; // { msg: "Logout successful" }
    } catch (err) {
      return rejectWithValue(err.response?.data?.msg || "Logout failed");
    }
  }
);

// Fetch current user (based on token in cookie)
export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        "https://my-books-project.onrender.com/api/auth/me"
      );
      return data.user; // user object
    } catch {
      return rejectWithValue(null);
    }
  }
);

// ===========================
// Initial State
// ===========================
const initialState = {
  user: null,
  token: null, // optional marker for front-end only
  loading: false,
  error: null,
  message: null
};

// ===========================
// Auth Slice
// ===========================
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Clear error and success messages
    clearAuthState: (state) => {
      state.error = null;
      state.message = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // -------- REGISTER --------
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.msg;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // -------- LOGIN --------
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = "cookie"; // marker only
        state.message = action.payload.msg;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // -------- LOGOUT --------
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.user = null;
        state.token = null;
        state.message = action.payload.msg;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload;
      })

      // -------- FETCH CURRENT USER --------
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.user = null;
        state.token = null;
      });
  }
});

// ===========================
// Exports
// ===========================
export const { clearAuthState } = authSlice.actions;
export default authSlice.reducer;
