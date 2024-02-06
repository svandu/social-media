const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("MongoDB Connection String:", `${process.env.MONGODB_URI}/${process.env.DB_NAME}`);

    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.DB_NAME}`
    );
    console.log(
      `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB connection FAILED ", error);
    // process.exit(1);
  }
};

module.exports = connectDB;
