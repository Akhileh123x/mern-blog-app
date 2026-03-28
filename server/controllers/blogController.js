import fs from "fs";
import imagekit from "../configs/imageKit.js";
import Blog from "../models/Blogs.js";
import Comment from "../models/Comment.js";
import { generateContentAI } from "../configs/ai.js";

// 🔹 ADD BLOG
export const addBlog = async (req, res) => {
  try {
    const blogData = JSON.parse(req.body.blog);
    const { title, subTitle, description, category } = blogData;

    const isPublished =
      blogData.isPublished === true || blogData.isPublished === "true";

    const imageFile = req.file;

    if (!title || !description || !category || !imageFile) {
      return res.json({ success: false, message: "Missing required fields" });
    }

    const fileBuffer = fs.readFileSync(imageFile.path);

    if (!imageFile.originalname) {
      imageFile.originalname = `blog-${Date.now()}.jpg`;
    }

    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "blogs",
    });

    const image = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" },
        { format: "webp" },
        { width: "1280" },
      ],
    });

    await Blog.create({
      title,
      subTitle,
      description,
      category,
      image,
      isPublished,
    });

    res.json({ success: true, message: "Blog added successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// 🔹 GET ALL BLOGS
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true });
    res.json({ success: true, blogs });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// 🔹 GET SINGLE BLOG
export const getBlogById = async (req, res) => {
  try {
    const { blogId } = req.params;

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.json({ success: false, message: "Blog not found!" });
    }

    res.json({ success: true, blog });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// 🔹 DELETE BLOG
export const deleteBlogById = async (req, res) => {
  try {
    const { id } = req.body;

    await Blog.findByIdAndDelete(id);
    await Comment.deleteMany({ blog: id });

    res.json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// 🔹 TOGGLE PUBLISH
export const togglePublish = async (req, res) => {
  try {
    const { id } = req.body;

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.json({ success: false, message: "Blog not found" });
    }

   await Blog.findByIdAndUpdate(id, {
  isPublished: !blog.isPublished
});

    res.json({ success: true, message: "Blog status updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// 🔹 ADD COMMENT 
export const addComment = async (req, res) => {
  try {
    const { blogId, name, content } = req.body;

    if (!blogId || !name || !content) {
      return res.json({ success: false, message: "All fields required" });
    }

    await Comment.create({
      blog: blogId, 
      name,
      content,
      isApproved: true, // 🔥 instant visible (remove if using admin approval)
    });

    res.json({ success: true, message: "Comment added" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// 🔹 GET BLOG COMMENTS
export const getBlogComments = async (req, res) => {
  try {
    const { blogId } = req.body;

    const comments = await Comment.find({
      blog: blogId,
      isApproved: true,
    }).sort({ createdAt: -1 });

    res.json({ success: true, comments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// 🔹 GET ALL COMMENTS (ADMIN)
export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find({})
      .populate("blog")
      .sort({ createdAt: -1 });

    res.json({ success: true, comments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// 🔹 DELETE COMMENT
export const deleteCommentById = async (req, res) => {
  try {
    const { id } = req.body;

    
    await Comment.findByIdAndUpdate(id, {
      isApproved: false
    });

    res.json({ success: true, message: "Moved to Not Approved" });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// 🔹 APPROVE COMMENT
export const approveCommentById = async (req, res) => {
  try {
    const { id } = req.body;

    await Comment.findByIdAndUpdate(id, { isApproved: true });

    res.json({ success: true, message: "Comment approved" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// 🔹 DASHBOARD
export const getDashboard = async (req, res) => {
  try {
    const recentBlogs = await Blog.find({})
      .sort({ createdAt: -1 })
      .limit(5);

    const blogs = await Blog.countDocuments();
    const comments = await Comment.countDocuments();
    const drafts = await Blog.countDocuments({ isPublished: false });

    res.json({
      success: true,
      dashboardData: { blogs, comments, drafts, recentBlogs },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const deleteCommentPermanent = async (req, res) => {
  try {
    const { id } = req.body;

    await Comment.findByIdAndDelete(id);

    res.json({ success: true, message: "Comment deleted permanently" });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// GEMINI API 

export const generateContent = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.json({
        success: false,
        message: "Prompt is required",
      });
    }

    const content = await generateContentAI(prompt);

    return res.json({
      success: true,
      content,
    });

  } catch (error) {
    console.log("Controller Error:", error.message);

    return res.json({
      success: false,
      message: error.message,
    });
  }
};