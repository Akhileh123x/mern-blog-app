import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/pages/Home'
import Blog from './components/pages/Blog'
import Layout from './components/pages/Admin/Layout'
import Dashboard from './components/pages/Admin/Dashboard'
import AddBlog from './components/pages/Admin/AddBlog'
import Comments from './components/pages/Admin/Comments'
import Login from './components/Admin/Login'
import ListBlog from './components/pages/Admin/ListBlog'
import 'quill/dist/quill.snow.css'
import {Toaster} from 'react-hot-toast'
import { useAppContext } from './context/AppContext'


const App = () => {

  const {token} = useAppContext()
  return (
    <div>
      <Toaster/>

      <Routes>

        <Route path='/' element={<Home />} />

        <Route path='/blog/:id' element={<Blog />} />

        <Route path='/admin' element={token ? <Layout /> : <Login/>}>

          <Route index element={<Dashboard />} />

          <Route path='addBlog' element={<AddBlog />} />

          <Route path='listBlog' element={<ListBlog />} />

          <Route path='comments' element={<Comments />} />

        </Route>

      </Routes>

    </div>
  )
}

export default App