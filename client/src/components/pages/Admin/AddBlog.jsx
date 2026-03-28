import React, { useEffect, useRef, useState } from "react";
import { assets, blogCategories } from "../../../assets/assets";
import Quill from "quill";
import { useAppContext } from "../../../context/AppContext";
import toast from "react-hot-toast";

function AddBlog() {
  const { axios } = useAppContext();

  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [category, setCategory] = useState("");
  const [isPublished, setIsPublished] = useState(false);

  // ✅ AI GENERATE FUNCTION
  const generateContent = async () => {
    if (!title) return toast.error("Please enter a title");

    try {
      setLoading(true);

      const res = await axios.post("/api/blog/generate", {
        prompt: title,
      });

      if (res.data.success) {
        quillRef.current.root.innerHTML = res.data.content;
      }
    } catch (error) {
      console.log(error);
      toast.error("AI generation failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ INIT QUILL
  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
  }, []);

  // ✅ SUBMIT BLOG
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!image) return toast.error("Thumbnail required");
    if (!title.trim()) return toast.error("Title required");
    if (!subTitle.trim()) return toast.error("SubTitle required");
    if (!category) return toast.error("Select category");
    if (!quillRef.current?.root?.innerHTML.trim())
      return toast.error("Description required");

    try {
      setIsAdding(true);

      const blog = {
        title,
        subTitle,
        description: quillRef.current.root.innerHTML,
        category,
        isPublished,
      };

      const formData = new FormData();
      formData.append("blog", JSON.stringify(blog));
      formData.append("image", image);

      const { data } = await axios.post(
        "http://localhost:3000/api/blog/add",
        formData
      );

      if (data.success) {
        toast.success("Blog added");

        // reset
        setImage(null);
        setTitle("");
        setSubTitle("");
        setCategory("");
        setIsPublished(false);
        quillRef.current.root.innerHTML = "";
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to add blog");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll"
    >
      <div className="bg-white max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded">

        {/* IMAGE */}
        <p>Upload thumbnail</p>
        <label htmlFor="image">
          <img
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            className="mt-2 h-16 cursor-pointer"
          />
          <input
            type="file"
            hidden
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </label>

        {/* TITLE */}
        <p className="mt-4">Blog Title</p>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mt-2 p-2 border rounded"
        />

        {/* SUBTITLE */}
        <p className="mt-4">Sub Title</p>
        <input
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
          className="w-full mt-2 p-2 border rounded"
        />

        {/* DESCRIPTION */}
        <p className="mt-4">Description</p>
        <div className="relative">
          <div ref={editorRef}></div>

          <button
            type="button"
            onClick={generateContent}
            className="absolute right-2 bottom-2 bg-black text-white px-3 py-1 text-xs rounded"
          >
            {loading ? "Generating..." : "Generate AI"}
          </button>
        </div>

        {/* CATEGORY */}
        <p className="mt-4">Category</p>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-2 p-2 border rounded"
        >
          <option value="">Select</option>
          {blogCategories.map((item, i) => (
            <option key={i} value={item}>
              {item}
            </option>
          ))}
        </select>

        {/* PUBLISH */}
        <div className="flex gap-2 mt-4">
          <p>Publish</p>
          <input
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
          />
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          className="mt-6 bg-primary text-white px-6 py-2 rounded"
        >
          {isAdding ? "Adding..." : "Add Blog"}
        </button>

      </div>
    </form>
  );
}

export default AddBlog;