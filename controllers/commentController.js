const User = require("../models/user.js");
const Post = require("../models/post.js");
const Comment = require("../models/comment.js");

// create new comment
exports.createComment = async (req, res, next) => {
  const { body, postId, userId } = req.body;

  if (!body || !postId || !userId)
    return res.status(400).json({
      success: false,
      data: null,
      error: "Body has incomplete data.",
    });
  try {
    const user = await User.findById({ _id: userId });
    const post = await Post.findById({ _id: postId });

    if (!user || !post) {
      return res.status(400).json({
        success: false,
        data: null,
        error: "Something is wrong.",
      });
    }

    const comment = new Comment({ body, postId, userId });
    await comment.save();
    res.status(201).json({
      success: true,
      data: comment,
      error: "",
    });
  } catch (error) {
    res.status(400).json({ success: false, data: null, error: error.message });
  }
};
