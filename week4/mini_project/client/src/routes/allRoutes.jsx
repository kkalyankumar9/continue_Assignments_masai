import React from "react";
import Home from "../pages/home";
import PageNotFound from "../pages/pageNotFound";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/login";
import Register from "../pages/register";
import Books from "../components/allBooks";
import MyBooks from "../components/myBooks";
import PrivateRouter from "./privateRoute";

const AllRoutes = () => {
  return (
    <>
      <Routes>
        {/* Static route */}
        <Route path="/" element={<Home />} />

        {/* Dynamic route */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* 404 fallback */}
        <Route path="/books" element={<Books />} />
        <Route
          path="/my_books"
          element={
            <PrivateRouter>
              <MyBooks />
            </PrivateRouter>
          }
        />

        <Route path="/books/:id" element={<Books />} />
        <Route path="/books/:id/status" element={<Books />} />
        <Route path="/books/:id/rating" element={<Books />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default AllRoutes;
