require("dotenv").config();
import mocha from "mocha";
import mongoose from "mongoose";
import chai from "chai";

const expect = chai.expect;

describe("The Database", function() {
  it("development db string must be present", function() {
    expect(process.env.dev_db).to.not.be.undefined;
    expect(process.env.dev_db).to.be.a("string");
  });

  it("production db string must be present", function() {
    expect(process.env.prod_db).to.not.be.undefined;
    expect(process.env.prod_db).to.be.a("string");
  });

  it("test db string must be present", function() {
    expect(process.env.test_db).to.not.be.undefined;
    expect(process.env.test_db).to.be.a("string");
  });
});

describe("The Database ", function() {
  it("development must be rechable", async () => {
    const db = await mongoose.connect(process.env.dev_db, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    expect(db).to.not.be.null;
    await db.connection.close();
  });
  it("test must be rechable", async () => {
    const db = await mongoose.connect(process.env.test_db, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    expect(db).to.not.be.null;
    await db.connection.close();
  });
  it("production must be rechable", async () => {
    const db = await mongoose.connect(process.env.prod_db, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    expect(db).to.not.be.null;
    await db.connection.close();
  });
});
