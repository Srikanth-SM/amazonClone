import mongoose from "mongoose";
import UserModel from "../../server/models/user";

let user;
if (UserModel) {
  user = new UserModel(testUser);
} else {
  console.log("User model not connected", UserModel);
}

const testUser = {
  name: "sri",
  password: "srikanth1234",
  email: "srikanth@gmail.com"
};

let db;
const before = async () => {
  try {
    db = await mongoose.connect(process.env.test_db);
    if (UserModel) await UserModel.deleteMany({});
    // console.log(UserModel.find());
  } catch (err) {
    console.log(err);
  }
};

const after = async () => {
  try {
    if (UserModel) await UserModel.deleteMany({});
  } catch (err) {
    console.log(err);
  }
};
// console.log(UserModel);
export default {
  UserModel,
  testUser,
  before,
  after
};
