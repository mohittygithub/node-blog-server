const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const dbConnect = require("./utils/dbConnect.js");
const userRoutes = require("./routes/userRoutes.js");
const postRoutes = require("./routes/postRoutes.js");
const commentRoutes = require("./routes/commentRoutes.js");
const { auth } = require("./utils/authRoute.js");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// connecting to database
dbConnect();

// routes

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

//server listener
const PORT = process.env.PORT || 5001;

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
