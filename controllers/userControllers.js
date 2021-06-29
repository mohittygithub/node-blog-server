const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

// user registration
exports.registerUser = async (req, res, next) => {
  const { name, profileImage, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ success: false, data: null, error: "Body has incomplete data." });
  }

  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        data: null,
        error: "Email already registered.",
      });
    }

    const encryptedPassword = await bcrypt.hashSync(password, 10);
    const newUser = new User({
      name,
      profileImage,
      email,
      password: encryptedPassword,
    });
    await newUser.save();

    res.status(201).json({ success: true, data: newUser, error: null });
  } catch (error) {
    res.status(500).json({ success: false, data: null, error: error.message });
  }
};

// user login
exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  // console.log(req.body);

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      data: null,
      error: "Body has incomplete data.",
    });
  }
  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({
        success: false,
        data: null,
        error: "Incorrect username/password.",
      });
    }

    const comparePasswords = await bcrypt.compareSync(password, user.password);

    if (!comparePasswords) {
      return res.status(400).json({
        success: false,
        data: null,
        error: "Incorrect username/password.",
      });
    }

    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({
      success: true,
      data: { token: token },
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: "",
      error: error.message,
    });
  }
};

// get user by id
exports.getUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById({ _id: id });
    res.send(user);
  } catch (error) {
    res.send({ error });
  }
};
