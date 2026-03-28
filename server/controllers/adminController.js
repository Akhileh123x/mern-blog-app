import jwt from "jsonwebtoken";
import Blog from "../models/Blogs.js";

export const adminLogin = async (req, res) => {
  try {

    const { email, password } = req.body;

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET);

    res.json({ success: true, token });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getAllBlogsAdmin = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });

    res.json({
      success: true,blogs});

  } catch (error) {
    res.json({
      success: false, message: error.message});
  }
};