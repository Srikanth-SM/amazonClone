require("dotenv").config();
import mongoose from "mongoose";
mongoose.set("debug", true);

export default async db => {
  try {
    return await mongoose.connect(db);
  } catch (err) {
    console.log("err when connecting to db", err);
  }
};

// export default mongoose.connect();
