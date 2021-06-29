const express = require("express");
const { createComment } = require("../controllers/commentController");
const auth = require("../utils/authRoute");

const router = express.Router();

router.post("/", auth, createComment);

module.exports = router;
