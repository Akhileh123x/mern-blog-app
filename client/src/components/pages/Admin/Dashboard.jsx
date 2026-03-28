import React, { useEffect, useState } from 'react';
import { assets } from '../../../assets/assets';
import BlogTableletter from '../../Admin/BlogTableletter';
import { useAppContext } from '../../../context/AppContext';

function Dashboard() {

  const { axios } = useAppContext();

  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: []
  });

  const fetchDashboardData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/blog/dashboard");

      if (res.data.success) {
        setDashboardData(res.data.dashboardData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="flex-1 p-4 md:p-10 bg-blue-50/50">

      <div className="flex flex-wrap gap-4">

        {/* BLOGS */}
        <div className="flex items-center gap-4 bg-white p-4 min-w-[230px] rounded-lg shadow-md">
          <img src={assets.dashboard_icon_1} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>
              {dashboardData.blogs}
            </p>
            <p className='text-gray-400'>Blogs</p>
          </div>
        </div>

        {/* COMMENTS */}
        <div className="flex items-center gap-4 bg-white p-4 min-w-[230px] rounded-lg shadow-md">
          <img src={assets.dashboard_icon_2} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>
              {dashboardData.comments}
            </p>
            <p className='text-gray-400'>Comments</p>
          </div>
        </div>

        {/* DRAFTS */}
        <div className="flex items-center gap-4 bg-white p-4 min-w-[230px] rounded-lg shadow-md">
          <img src={assets.dashboard_icon_3} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>
              {dashboardData.drafts}
            </p>
            <p className='text-gray-400'>Drafts</p>
          </div>
        </div>

        {/* RECENT BLOG COUNT */}
        <div className="flex items-center gap-4 bg-white p-4 min-w-[230px] rounded-lg shadow-md">
          <img src={assets.dashboard_icon_4} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>
              {dashboardData.recentBlogs.length}
            </p>
            <p className='text-gray-400'>Recent Blogs</p>
          </div>
        </div>

      </div>

      {/* TABLE */}
      <div className="mt-6 bg-white shadow rounded-lg overflow-x-auto">

        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-gray-600 text-left uppercase">
            <tr>
              <th className='px-2 py-4 xl:px-6'>#</th>
              <th className='px-2 py-4'>Blog Title</th>
              <th className='px-2 py-4 max-sm:hidden'>Date</th>
              <th className='px-2 py-4 max-sm:hidden'>Status</th>
              <th className='px-2 py-4'>Action</th>
            </tr>
          </thead>

          <tbody>
            {dashboardData.recentBlogs.map((blog, index) => (
              <BlogTableletter
                key={blog._id}
                blog={blog}
                fetchBlogs={fetchDashboardData}
                index={index + 1}
              />
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Dashboard;