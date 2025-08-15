import React from 'react'
import Home from '../pages/home'
import PageNotFound from '../pages/pageNotFound'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/login'
import Register from '../pages/register'

const AllRoutes = () => {
  return (
    <>
        <Routes>
      {/* Static route */}
      <Route path="/" element={<Home />} />

      {/* Dynamic route */}
       <Route path="/login" element={<Login/>} /> 
 <Route path="/register" element={<Register/>} /> 
      {/* 404 fallback */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
    </>
  )
}

export default AllRoutes