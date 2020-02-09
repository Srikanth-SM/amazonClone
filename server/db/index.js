import mongoose from 'mongoose';
// import mongodb from 'mongodb';

require('dotenv').config();

// const MongoClient = mongodb.MongoClient;
mongoose.set('debug', true);

export default async (db) => {
  try {
    // const client = new MongoClient(db);
    return await mongoose.connect(db, { useNewUrlParser: true }); // for mongoose npm
    // return await client.connect();
  } catch (err) {
    throw new Error(err);
  }
};
