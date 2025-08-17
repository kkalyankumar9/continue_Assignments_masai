import React from 'react'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import { useSelector } from 'react-redux';
import Books from '../components/allBooks';


const Home = () => {
    const token = useSelector((store) => store.auth.token);
    console.log("Token from Home page:", token);

  return (
    <div>
<Navbar/>
<Books/>

<Footer/>
    </div>
  )
}

export default Home