const express = require("express");
const auth = require("../utils/authRoute.js");
const { getPosts, createPost } = require("../controllers/postController");

const router = express.Router();

router.get("/", auth, getPosts);
router.post("/", auth, createPost);

module.exports = router;
