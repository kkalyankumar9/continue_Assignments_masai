import React from 'react'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import { useSelector } from 'react-redux';


const Home = () => {
    const token = useSelector((store) => store.auth.token);
    console.log("Token from Home page:", token);

  return (
    <div>
<Navbar/>

<Footer/>
    </div>
  )
}

export default Home