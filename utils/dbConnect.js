const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI,
      {
        useCreateIndex: true,
        useFindAndModify: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      () => console.log("Connected to DB")
    );
  } catch (error) {
    console.log("Error=>", error.message);
  }
};

module.exports = dbConnect;
