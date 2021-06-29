const Post = require("../models/post.js");
const User = require("../models/user.js");

// get all posts
exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({});
    res.status(200).json({ success: true, data: posts, error: "" });
  } catch (error) {
    res.status(500).json({ success: false, data: null, error: error.message });
  }
};

// create post
exports.createPost = async (req, res, next) => {
  const { title, description, comments, userId } = req.body;
  if (!title || !description || !userId) {
    return res.status(400).json({
      success: false,
      data: null,
      error: "Body has incomplete data.",
    });
  }

  try {
    const user = await User.findById({ _id: userId });
    !user &&
      res.status(400).json({
        success: false,
        data: null,
        error: "User not found!",
      });

    const newPost = new Post({ title, description, comments, userId });
    await newPost.save();

    res.status(201).json({
      success: true,
      data: newPost,
      error: "",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      error: error.message,
    });
  }
};
