console.log(__filename);
import mongooseConnection from "./db";
import server from "./routes";
console.log(mongooseConnection);
mongooseConnection(process.env.dev_db)
  .then(() => {
    console.log("db connected");
    server.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
// console.log(server);
