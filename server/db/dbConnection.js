console.log(__filename);
import mongoose from "mongoose";
mongoose.set("debug", true);
var username = process.env.MONGODB_USERNAME;
var password = process.env.MONGODB_PASSWORD;

mongoose.connect(
  `mongodb://${username}:${password}@ds129085.mlab.com:29085/shoppingcart`,
  function(err, success) {
    if (!err && success) {
      console.log("connection successful");
    } else {
      console.log("error", err);
    }
  }
);
var Schema = mongoose.Schema;
// db.disconnect();
export default {
  mongoose,
  Schema
};
