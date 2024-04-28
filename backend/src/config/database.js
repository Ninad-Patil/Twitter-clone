import mongoose from "mongoose";

const databaseConnection = () => {
  try {
    mongoose.connect(process.env.MONGO_URI).then(() => {
      console.log("connected to db");
    });
  } catch (error) {
    console.log(error);
  }
};

export default databaseConnection;
