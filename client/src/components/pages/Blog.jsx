import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets } from "../../assets/assets";
import Navbar from "../Navbar";
import Moment from "moment";
import Loader from "../Loader";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

function Blog() {
  const { id } = useParams();
  const { axios } = useAppContext();

  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const fetchBlogData = async () => {
    try {
      const { data } = await axios.get(`/api/blog/${id}`);
      data.success ? setData(data.blog) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchComments = async () => {
    try {
      const { data } = await axios.post("/api/blog/comments", { blogId: id });
      data.success ? setComments(data.comments) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/blog/add-comments", {
        blogId: id,
        name,
        content,
      });
      if (data.success) {
        toast.success("Comment added");
        setName("");
        setContent("");
        fetchComments();
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (id) {
      fetchBlogData();
      fetchComments();
    }
  }, [id]);

  return data ? (
    <div className="relative">
      <img src={assets.gradientBackground} alt="" className="absolute -top-50 -z-10 opacity-50" />

      <Navbar />

      <div className="text-center mt-20 text-gray-600">
        <p className="text-primary py-4 font-medium">
          Published on {Moment(data.createdAt).format("MMMM Do YYYY")}
        </p>
        <h1 className="text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800">
          {data.title}
        </h1>
        <h2 className="my-5 max-w-lg truncate mx-auto">{data.subTitle}</h2>
        <p className="inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary">
          Done Philipose
        </p>
      </div>

      <div className="mx-5 max-w-5xl md:mx-auto my-10 mt-6">
        <img src={data.image} alt="" className="rounded-3xl mb-5" />
        <div
          className="rich-text max-w-3xl mx-auto"
          dangerouslySetInnerHTML={{ __html: data.description }}
        />
      </div>

      <div className="mt-14 mb-10 max-w-3xl mx-auto">
        <p className="font-medium mb-4">Comments ({comments.length})</p>

        <form onSubmit={handleAddComment} className="flex flex-col gap-4 mb-8">
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border p-2 rounded"
          />
          <textarea
            placeholder="Write your comment..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="border p-2 rounded"
          />
          <button type="submit" className="bg-primary text-white px-4 py-2 rounded w-fit">
            Submit
          </button>
        </form>

        <div className="flex flex-col gap-4">
          {comments.length > 0 ? (
            comments.map((item) => (
              <div key={item._id} className="bg-primary/20 border border-primary/5 max-w-xl p-4 rounded text-gray-600">
                <div className="flex items-center gap-2 mb-2">
                  <img src={assets.user_icon} alt="user" className="w-6" />
                  <p className="font-medium">{item.name}</p>
                </div>
                <p className="text-sm">{item.content}</p>
                <p className="text-xs text-gray-400 mt-2">
                  {Moment(item.createdAt).fromNow()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-sm">No comments yet</p>
          )}
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
}

export default Blog;