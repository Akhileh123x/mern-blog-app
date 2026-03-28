import React from 'react'
import { assets } from '../../../assets/assets'
import { useAppContext } from '../../../context/AppContext'
import toast from 'react-hot-toast'

const BlogTableItem = ({ blog, fetchBlogs, index }) => {

    const { title, createdAt, isPublished, _id } = blog
    const BlogDate = new Date(createdAt)

    const { axios } = useAppContext()

    // ✅ DELETE BLOG
    const deleteBlog = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this blog?")
        if (!confirmDelete) return

        try {
            const { data } = await axios.post(
                'http://localhost:3000/api/blog/delete',
                { id: _id }
            )

            if (data.success) {
                toast.success(data.message)
                fetchBlogs()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.message || error.message)
        }
    }

    // ✅ TOGGLE PUBLISH
    const togglePublish = async () => {
        try {
            const { data } = await axios.post(
                'http://localhost:3000/api/blog/toggle-publish',
                { id: _id }
            )

            if (data.success) {
                toast.success(data.message)
                fetchBlogs()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.message || error.message)
        }
    }

    return (
        <tr className='border-y border-gray-300'>

            <th className='px-2 py-4'>{index}</th>

            <td className='px-2 py-4'>{title}</td>

            <td className='px-2 py-4 max-sm:hidden'>
                {BlogDate.toDateString()}
            </td>

            <td className='px-2 py-4 max-sm:hidden'>
                <p className={`${isPublished ? "text-green-600" : "text-orange-700"}`}>
                    {isPublished ? 'Published' : 'Unpublished'}
                </p>
            </td>

            <td className='px-2 py-4 flex gap-3'>

                {/*  Publish Toggle */}
                <button
                    onClick={togglePublish}
                    className='border px-2 py-0.5 mt-1 rounded cursor-pointer'
                >
                    {isPublished ? 'Unpublish' : 'Publish'}
                </button>

                {/* ✅ Delete */}
                <img
                    onClick={deleteBlog}
                    src={assets.cross_icon}
                    className='w-8 hover:scale-110 transition-all cursor-pointer'
                    alt="" />
               

            </td>

        </tr>
    )
}

export default BlogTableItem