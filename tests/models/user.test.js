require("dotenv").config();
import helper from "../helpers";
import chai from "chai";
import UserModel from "../../server/models/user";

const expect = chai.expect;

const { testUser, before, after } = helper;

before(() => {
  console.log("executing before each");
  before();
});

// afterEach(() => {
//   console.log("executing after each");
//   after();
// });

describe("test", () => {
  it("true == true", () => {
    expect(true).to.be.true;
  });
  it("user model test", async function() {
    const user = new UserModel(testUser);
    const savedUser = await user.save();
    console.log(savedUser);
    expect(savedUser.email).to.be.equal(testUser.email);

    // done();
  });
});
