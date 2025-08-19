// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
 import authReducer from './auth/authSlice';
 import booksReducer from './books/allBooksSlice';
import myBooksReducer from './books/myBooksSlice';
export const store = configureStore({
   reducer: { 
    auth: authReducer ,
    books: booksReducer,
      myBooks: myBooksReducer,
  },
});
