const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

export default {
  database: `mongodb://${username}:${password}@ds129085.mlab.com:29085/shoppingcart`,
  // host: "http://localhost",
  port: 27017,
};
