import React from 'react'
import { assets } from '../../../assets/assets'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../../Admin/Sidebar'

function Layout() {

  const navigate = useNavigate()

  const logout = () => {
    navigate('/')
  }

  return (
    <div>

      {/* Header */}
      <div className="flex items-center justify-between py-2 h-[70px] px-4 sm:px-12 border-b border-gray-200">

        <img
          src={assets.logo}
          alt="logo"
          className="w-32 sm:w-40 cursor-pointer"
          onClick={() => navigate('/')}
        />

        <button
          onClick={logout}
          className="text-sm px-8 py-2 bg-primary text-white rounded-full cursor-pointer"
        >
          Logout
        </button>

      </div>

      {/* Main Layout */}
      <div className="flex h-[calc(100vh-70px)]">

        {/* Sidebar */}
        <Sidebar />

        {/* Page Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </div>

      </div>

    </div>
  )
}

export default Layout