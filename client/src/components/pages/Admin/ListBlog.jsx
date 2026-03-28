import React, { useEffect, useState } from 'react'
import BlogTableItem from './BlogTableItem'
import axios from 'axios'
import toast from 'react-hot-toast'

function ListBlog() {

    const [blogs, setBlogs] = useState([])

    // ✅ Fetch blogs
    const fetchBlogs = async () => {
        try {
            console.log("Fetching blogs...")

            const { data } = await axios.get(
                'http://localhost:3000/api/admin/blogs'
            )

            console.log("Response:", data)

            if (data.success) {
                setBlogs(data.blogs)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.message || error.message)
        }
    }

    useEffect(() => {
        fetchBlogs()
    }, [])

    return (
        <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50">

            <h1 className="text-lg font-semibold">All Blogs</h1>

            <div className="relative h-4/5 max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white mt-4">

                <table className="w-full text-sm text-gray-500">
                    <thead className="text-xs text-gray-600 text-left uppercase bg-gray-100">
                        <tr>
                            <th className='px-2 py-4 xl:px-6'>#</th>
                            <th className='px-2 py-4'>Blog Title</th>
                            <th className='px-2 py-4 max-sm:hidden'>Date</th>
                            <th className='px-2 py-4 max-sm:hidden'>Status</th>
                            <th className='px-2 py-4'>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {blogs.length > 0 ? (
                            blogs.map((blog, index) => (
                                <BlogTableItem
                                    key={blog._id}
                                    blog={blog}
                                    fetchBlogs={fetchBlogs}
                                    index={index + 1}
                                />
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-6">
                                    No blogs found
                                </td>
                            </tr>
                        )}
                    </tbody>

                </table>

            </div>
        </div>
    )
}

export default ListBlog