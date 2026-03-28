import React from 'react'
import Navbar from '../Navbar'
import Header from '../Header'
import BlogList from '../BlogList'
import NewsLetter from '../NewsLetter'
import Footer from '../Footer'

function Home() {
  return (


    <>
      <Navbar />
      <Header />
      <BlogList/>
      <NewsLetter/>
      <Footer/>
    </>
  )
}

export default Home