const express = require("express");
const auth = require("../utils/authRoute.js");
const {
  registerUser,
  loginUser,
  getUser,
} = require("../controllers/userControllers.js");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:id", auth, getUser);

module.exports = router;
